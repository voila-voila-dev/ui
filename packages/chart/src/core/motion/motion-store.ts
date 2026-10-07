import { type Generator, spring, tween } from "@voila.dev/motion";
import { enterFrom, exitTo } from "#/core/motion/enter-exit.ts";
import {
	type GeometryPlan,
	geometryLength,
	geometryPath,
	geometryPlan,
} from "#/core/motion/geometry.ts";
import { type ChartTiming, staggerDelay } from "#/core/motion/timing.ts";
import { tweenPath } from "#/core/motion/tween.ts";
import type { ChartScene, SceneNode } from "#/core/types.ts";

/**
 * Every moving number of a chart, as springs keyed by node and channel. A
 * new scene retargets them: each channel starts from where it is painted, at
 * the speed it has, so an update landing mid-flight bends the motion instead
 * of kinking it. Pure and clocked from outside (milliseconds), so the SVG and
 * Canvas renderers move identically and tests step it by hand. Hit-testing
 * and focus never read it: they read the scene it moves towards, which never
 * holds the marks still collapsing on their way out.
 */
export interface MotionStore {
	retarget(scene: ChartScene, now: number): void;
	/** The first render: lines that `enter: "draw"` trace themselves in. False when none does. */
	introduce(now: number): boolean;
	/** Jumps to `scene`: a resize, or reduced motion. */
	snap(scene: ChartScene): void;
	frame(now: number): ChartScene;
	settled(now: number): boolean;
}

interface Motion {
	readonly generator: Generator;
	/** Milliseconds, the delay included. */
	readonly start: number;
}

interface PathMotion extends Motion {
	readonly from: string;
	readonly to: string;
}

/** A data mark collapsing on its way out: drawn after its old sibling until its springs settle. */
interface Leaving {
	readonly node: SceneNode;
	readonly after: string | undefined;
	readonly siblings: readonly SceneNode[];
}

type Numeric = Record<string, number>;

const FIELDS: Record<SceneNode["kind"], readonly string[]> = {
	rect: ["x", "y", "width", "height"],
	circle: ["cx", "cy", "r"],
	line: ["x1", "y1", "x2", "y2"],
	text: ["x", "y"],
	path: [],
	group: [],
};

const OPACITY = "opacity";
const DRAWN = "drawn";
const SEPARATOR = "\u0000";

function walk(
	nodes: readonly SceneNode[],
	visit: (node: SceneNode, siblings: readonly SceneNode[]) => void,
) {
	for (const node of nodes) {
		visit(node, nodes);
		if (node.kind === "group") walk(node.children, visit);
	}
}

function index(nodes: readonly SceneNode[]) {
	const byKey = new Map<string, SceneNode>();
	const siblings = new Map<string, readonly SceneNode[]>();
	walk(nodes, (node, list) => {
		byKey.set(node.key, node);
		siblings.set(node.key, list);
	});
	return { byKey, siblings };
}

function channelKey(node: string, channel: string): string {
	return `${node}${SEPARATOR}${channel}`;
}

function elapsed(motion: Motion, now: number): number {
	return Math.max(0, (now - motion.start) / 1000);
}

function done(motion: Motion, now: number): boolean {
	return elapsed(motion, now) >= motion.generator.duration;
}

function clamp(value: number): number {
	return Math.min(1, Math.max(0, value));
}

export function createMotionStore(
	initial: ChartScene,
	timing: ChartTiming,
): MotionStore {
	let target = initial;
	const numbers = new Map<string, Motion>();
	const paths = new Map<string, PathMotion>();
	const shapes = new Map<string, GeometryPlan>();
	const leaving = new Map<string, Leaving>();

	function generator(from: number, to: number, velocity: number): Generator {
		return timing.type === "spring"
			? spring({
					from,
					to,
					velocity,
					duration: timing.duration,
					bounce: timing.bounce,
				})
			: tween({
					keyframes: [from, to],
					duration: timing.duration,
					ease: timing.easing,
				});
	}

	function value(node: string, channel: string, fallback: number, now: number) {
		const motion = numbers.get(channelKey(node, channel));
		return motion ? motion.generator.at(elapsed(motion, now)).value : fallback;
	}

	/** Springs one channel from `from` to `to`, at the speed it already has. */
	function spring1(
		node: string,
		channel: string,
		from: number,
		to: number,
		start: number,
		now: number,
	) {
		const key = channelKey(node, channel);
		const running = numbers.get(key);
		const velocity = running
			? running.generator.at(elapsed(running, now)).velocity
			: 0;
		numbers.delete(key);
		if (from === to && velocity === 0) return;
		numbers.set(key, { generator: generator(from, to, velocity), start });
	}

	function drop(node: string) {
		for (const key of numbers.keys()) {
			if (key.startsWith(node + SEPARATOR)) numbers.delete(key);
		}
		paths.delete(node);
		shapes.delete(node);
		leaving.delete(node);
	}

	/** `from` is the node as painted now (or the shape it enters from), `to` where it goes. */
	function move(from: SceneNode, to: SceneNode, start: number, now: number) {
		const key = to.key;
		for (const field of FIELDS[to.kind]) {
			const was = (from as unknown as Numeric)[field] as number;
			spring1(
				key,
				field,
				was,
				(to as unknown as Numeric)[field] as number,
				start,
				now,
			);
		}
		if (to.kind !== "path" || from.kind !== "path") return;
		const previous = shapes.get(key);
		shapes.delete(key);
		paths.delete(key);
		const plan =
			from.geometry && to.geometry
				? geometryPlan(from.geometry, to.geometry)
				: undefined;
		if (plan) {
			for (const channel of previous?.targets.keys() ?? []) {
				if (!plan.targets.has(channel))
					numbers.delete(channelKey(key, `g${channel}`));
			}
			for (const [channel, goal] of plan.targets) {
				const was = plan.starts.get(channel) ?? goal;
				spring1(key, `g${channel}`, was, goal, start, now);
			}
			shapes.set(key, plan);
			return;
		}
		if (from.d !== to.d) {
			paths.set(key, {
				generator: generator(0, 1, 0),
				start,
				from: from.d,
				to: to.d,
			});
		}
	}

	function paintNode(node: SceneNode, now: number): SceneNode {
		if (node.kind === "group") {
			return { ...node, children: paintList(node.children, false, now) };
		}
		const key = node.key;
		const moved: Numeric = {};
		for (const field of FIELDS[node.kind]) {
			moved[field] = value(
				key,
				field,
				(node as unknown as Numeric)[field] as number,
				now,
			);
		}
		let next = { ...node, ...moved } as Exclude<SceneNode, { kind: "group" }>;
		const shape = shapes.get(key);
		if (next.kind === "path" && shape) {
			const geometry = shape.build((channel) =>
				value(key, `g${channel}`, shape.targets.get(channel) ?? 0, now),
			);
			next = { ...next, geometry, d: geometryPath(geometry) };
		}
		const path = paths.get(key);
		if (next.kind === "path" && path) {
			const progress = path.generator.at(elapsed(path, now)).value;
			next = { ...next, d: tweenPath(path.from, path.to, progress) };
		}
		const opacity = value(key, OPACITY, 1, now);
		const drawn = value(key, DRAWN, 1, now);
		if (opacity === 1 && drawn === 1) return next;
		const geometry = next.kind === "path" ? next.geometry : undefined;
		return {
			...next,
			paint: {
				...next.paint,
				opacity: (next.paint.opacity ?? 1) * clamp(opacity),
				...(drawn < 1 && geometry
					? {
							drawn: {
								fraction: clamp(drawn),
								length: geometryLength(geometry),
							},
						}
					: {}),
			},
		} as SceneNode;
	}

	/** The painted list, with the marks still on their way out after the sibling they followed. */
	function paintList(
		list: readonly SceneNode[],
		top: boolean,
		now: number,
	): SceneNode[] {
		const out: SceneNode[] = [];
		function place(after: string | undefined) {
			for (const [key, exit] of leaving) {
				if (exit.after !== after) continue;
				out.push(paintNode(exit.node, now));
				place(key);
			}
		}
		if (top) place(undefined);
		for (const node of list) {
			out.push(paintNode(node, now));
			place(node.key);
		}
		return out;
	}

	function prune(now: number) {
		for (const [key, motion] of numbers) {
			if (done(motion, now)) numbers.delete(key);
		}
		for (const [key, motion] of paths) {
			if (done(motion, now)) paths.delete(key);
		}
		const moving = new Set(
			[...numbers.keys()].map((key) => key.split(SEPARATOR)[0]),
		);
		for (const key of shapes.keys()) {
			if (!moving.has(key)) shapes.delete(key);
		}
		for (const key of leaving.keys()) {
			if (!moving.has(key)) leaving.delete(key);
		}
	}

	return {
		retarget(scene, now) {
			const before = index(target.nodes);
			const after = index(scene.nodes);
			function painted(key: string): SceneNode | undefined {
				const node = before.byKey.get(key) ?? leaving.get(key)?.node;
				return node && paintNode(node, now);
			}
			for (const key of new Set([...before.byKey.keys(), ...leaving.keys()])) {
				if (after.byKey.has(key)) continue;
				const base = (before.byKey.get(key) ??
					leaving.get(key)?.node) as SceneNode;
				const siblings =
					before.siblings.get(key) ?? leaving.get(key)?.siblings ?? [];
				const goal = exitTo(base, siblings, after.byKey);
				const from = painted(key);
				if (!goal || !from) {
					drop(key);
					continue;
				}
				move(from, goal, now, now);
				const at = siblings.findIndex((node) => node.key === key);
				leaving.set(key, {
					node: goal,
					after: siblings[at - 1]?.key,
					siblings,
				});
			}
			const marks = [...after.byKey.values()].filter(
				(node) => node.role === "mark",
			);
			const order = new Map(marks.map((node, at) => [node.key, at]));
			for (const node of after.byKey.values()) {
				if (node.kind === "group") continue;
				const start =
					now +
					staggerDelay(timing, order.get(node.key) ?? 0, marks.length) * 1000;
				const old = painted(node.key);
				leaving.delete(node.key);
				const from =
					old ??
					enterFrom(node, after.siblings.get(node.key) ?? [], before.byKey);
				if (from) move(from, node, start, now);
				const fading = numbers.get(channelKey(node.key, OPACITY));
				if ((!from && node.enter !== "none") || fading) {
					spring1(
						node.key,
						OPACITY,
						fading ? value(node.key, OPACITY, 1, now) : 0,
						1,
						start,
						now,
					);
				}
			}
			target = scene;
		},
		introduce(now) {
			let any = false;
			walk(target.nodes, (node) => {
				if (node.kind !== "path" || node.enter !== "draw") return;
				if (node.geometry?.kind !== "points" || node.paint.strokeDasharray)
					return;
				spring1(node.key, DRAWN, 0, 1, now, now);
				any = true;
			});
			return any;
		},
		snap(scene) {
			numbers.clear();
			paths.clear();
			shapes.clear();
			leaving.clear();
			target = scene;
		},
		frame(now) {
			prune(now);
			if (numbers.size === 0 && paths.size === 0) return target;
			return { ...target, nodes: paintList(target.nodes, true, now) };
		},
		settled(now) {
			return [...numbers.values(), ...paths.values()].every((motion) =>
				done(motion, now),
			);
		},
	};
}
