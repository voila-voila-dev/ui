import { type Generator, spring, tween } from "@voila.dev/motion";
import {
	type LeavingGuide,
	leavingGuides,
	withLeaving,
} from "#/core/motion/leaving.ts";
import {
	STRING_CHANNELS,
	type StringChannel,
	stringMixer,
	stringOf,
	withStrings,
} from "#/core/motion/strings.ts";
import { type ChartTiming, staggerDelay } from "#/core/motion/timing.ts";
import type { ChartScene, SceneNode } from "#/core/types.ts";

/**
 * Every moving number of a chart, as springs keyed by node and channel. A
 * new scene retargets them: each channel starts from where it is painted, at
 * the speed it has, so an update landing mid-flight bends the motion instead
 * of kinking it. Pure and clocked from outside (milliseconds), so the SVG and
 * Canvas renderers move identically and tests step it by hand. Hit-testing
 * and focus never read it: they read the scene it moves towards.
 */
export interface MotionStore {
	retarget(scene: ChartScene, now: number): void;
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

/** A path or a colour: a progress from 0 to 1, and the mix it reads. */
interface StringMotion extends Motion {
	readonly mix: (progress: number) => string;
}

interface LeavingMotion extends Motion {
	readonly guide: LeavingGuide;
}

type Numeric = Record<string, number>;

const CHANNELS: Record<SceneNode["kind"], readonly string[]> = {
	rect: ["x", "y", "width", "height"],
	circle: ["cx", "cy", "r"],
	line: ["x1", "y1", "x2", "y2"],
	text: ["x", "y"],
	path: [],
	group: [],
};

const OPACITY = "opacity";

function flatten(
	nodes: readonly SceneNode[],
	into = new Map<string, SceneNode>(),
) {
	for (const node of nodes) {
		into.set(node.key, node);
		if (node.kind === "group") flatten(node.children, into);
	}
	return into;
}

function channelKey(node: string, channel: string): string {
	return `${node}\u0000${channel}`;
}

function elapsed(motion: Motion, now: number): number {
	return Math.max(0, (now - motion.start) / 1000);
}

function done(motion: Motion, now: number): boolean {
	return elapsed(motion, now) >= motion.generator.duration;
}

export function createMotionStore(
	initial: ChartScene,
	timing: ChartTiming,
): MotionStore {
	let target = initial;
	const numbers = new Map<string, Motion>();
	const strings = new Map<string, StringMotion>();
	const leaving = new Map<string, LeavingMotion>();

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

	function stringNow(key: string, now: number): string | undefined {
		const motion = strings.get(key);
		return motion?.mix(motion.generator.at(elapsed(motion, now)).value);
	}

	function moveNode(
		node: SceneNode,
		before: SceneNode | undefined,
		start: number,
		now: number,
	) {
		for (const channel of CHANNELS[node.kind]) {
			const key = channelKey(node.key, channel);
			const running = numbers.get(key);
			const state = running?.generator.at(elapsed(running, now));
			const from =
				state?.value ?? (before as unknown as Numeric | undefined)?.[channel];
			const to = (node as unknown as Numeric)[channel] as number;
			numbers.delete(key);
			if (from === undefined || (from === to && !state?.velocity)) continue;
			numbers.set(key, {
				generator: generator(from, to, state?.velocity ?? 0),
				start,
			});
		}
		for (const channel of STRING_CHANNELS) {
			const key = channelKey(node.key, channel);
			const from = stringNow(key, now) ?? stringOf(before, channel);
			const to = stringOf(node, channel);
			strings.delete(key);
			if (from === undefined || to === undefined || from === to) continue;
			strings.set(key, {
				generator: generator(0, 1, 0),
				start,
				mix: stringMixer(node, channel, from, to),
			});
		}
		const fading = channelKey(node.key, OPACITY);
		const fade = numbers.get(fading);
		if (before === undefined || fade) {
			const from = fade ? fade.generator.at(elapsed(fade, now)).value : 0;
			numbers.set(fading, { generator: generator(from, 1, 0), start });
		}
	}

	function paint(node: SceneNode, now: number): SceneNode {
		if (node.kind === "group") {
			return {
				...node,
				children: withLeaving(
					node.children.map((child) => paint(child, now)),
					node.key,
					fading(now),
				),
			};
		}
		const moved: Numeric = {};
		for (const channel of [...CHANNELS[node.kind], OPACITY]) {
			const motion = numbers.get(channelKey(node.key, channel));
			if (!motion) continue;
			moved[channel] = motion.generator.at(elapsed(motion, now)).value;
		}
		const mixed: Partial<Record<StringChannel, string>> = {};
		for (const channel of STRING_CHANNELS) {
			const value = stringNow(channelKey(node.key, channel), now);
			if (value !== undefined) mixed[channel] = value;
		}
		const { [OPACITY]: opacity, ...geometry } = moved;
		const next = withStrings({ ...node, ...geometry } as SceneNode, mixed);
		if (opacity === undefined) return next;
		const shown = Math.min(1, Math.max(0, opacity));
		const painted = next as Exclude<SceneNode, { kind: "group" }>;
		return {
			...painted,
			paint: {
				...painted.paint,
				opacity: (painted.paint.opacity ?? 1) * shown,
			},
		} as SceneNode;
	}

	function fading(now: number): Array<readonly [LeavingGuide, number]> {
		return [...leaving.values()].map((motion) => [
			motion.guide,
			Math.max(0, motion.generator.at(elapsed(motion, now)).value),
		]);
	}

	/** Every running motion, for pruning and for `settled`. */
	function all(): Array<Map<string, Motion>> {
		return [numbers, strings, leaving];
	}

	return {
		retarget(scene, now) {
			const before = flatten(target.nodes);
			const after = flatten(scene.nodes);
			const marks = [...after.values()].filter((node) => node.role === "mark");
			const order = new Map(marks.map((node, index) => [node.key, index]));
			for (const key of before.keys()) {
				if (after.has(key)) continue;
				for (const channel of STRING_CHANNELS) {
					strings.delete(channelKey(key, channel));
				}
				for (const channel of [
					...(CHANNELS[before.get(key)?.kind ?? "group"] ?? []),
					OPACITY,
				]) {
					numbers.delete(channelKey(key, channel));
				}
			}
			for (const node of after.values()) {
				const delay = staggerDelay(
					timing,
					order.get(node.key) ?? 0,
					marks.length,
				);
				const start = now + delay * 1000;
				const returning = leaving.get(node.key);
				moveNode(
					node,
					before.get(node.key) ?? returning?.guide.node,
					start,
					now,
				);
				if (returning) {
					const from = returning.generator.at(elapsed(returning, now)).value;
					numbers.set(channelKey(node.key, OPACITY), {
						generator: generator(Math.max(0, from), 1, 0),
						start,
					});
				}
			}
			for (const guide of leavingGuides(target.nodes, (key) =>
				after.has(key),
			)) {
				const shown = numbers.get(channelKey(guide.node.key, OPACITY));
				const from = shown ? shown.generator.at(elapsed(shown, now)).value : 1;
				leaving.set(guide.node.key, {
					generator: generator(from, 0, 0),
					start: now,
					guide,
				});
			}
			for (const key of after.keys()) leaving.delete(key);
			target = scene;
		},
		snap(scene) {
			for (const motions of all()) motions.clear();
			target = scene;
		},
		frame(now) {
			for (const motions of all()) {
				for (const [key, motion] of motions) {
					if (done(motion, now)) motions.delete(key);
				}
			}
			if (all().every((motions) => motions.size === 0)) return target;
			return {
				...target,
				nodes: withLeaving(
					target.nodes.map((node) => paint(node, now)),
					null,
					fading(now),
				),
			};
		},
		settled(now) {
			return all().every((motions) =>
				[...motions.values()].every((motion) => done(motion, now)),
			);
		},
	};
}
