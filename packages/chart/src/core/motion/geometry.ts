import { arcPath, areaPath, linePath, polygonPath } from "#/core/paths.ts";
import type { GeometryPoint, SceneGeometry } from "#/core/types.ts";

/**
 * A geometry in motion: every number it has, by channel name, where each
 * starts and where it goes, and how to rebuild the shape from the numbers of
 * one frame. The store springs the numbers; this module only knows shapes.
 */
export interface GeometryPlan {
	readonly starts: ReadonlyMap<string, number>;
	readonly targets: ReadonlyMap<string, number>;
	build(value: (channel: string) => number): SceneGeometry;
}

type Points = Extract<SceneGeometry, { kind: "points" }>;
type Arc = Extract<SceneGeometry, { kind: "arc" }>;

const POINT_FIELDS = ["x", "y", "x0", "y0"] as const;
const ARC_FIELDS = [
	"cx",
	"cy",
	"innerRadius",
	"outerRadius",
	"startAngle",
	"endAngle",
] as const;

/** The path data of a geometry, drawn by the same builders the marks use, so every frame is a valid shape. */
export function geometryPath(geometry: SceneGeometry): string {
	if (geometry.kind === "arc") {
		return arcPath({
			...geometry,
			endAngle: Math.max(geometry.startAngle, geometry.endAngle),
		});
	}
	const { runs, shape, curve } = geometry;
	if (shape === "polygon") return polygonPath(runs[0] ?? []);
	return runs
		.map((run) =>
			shape === "area"
				? areaPath(
						run,
						run.map((point) => ({
							x: point.x0 ?? point.x,
							y: point.y0 ?? point.y,
						})),
						curve,
					)
				: linePath(run, curve),
		)
		.join("");
}

function channel(key: string, field: string): string {
	return `${key}\u0001${field}`;
}

function fields(point: GeometryPoint, into: Map<string, number>) {
	for (const field of POINT_FIELDS) {
		const value = point[field];
		if (value !== undefined) into.set(channel(point.key, field), value);
	}
}

/** `point`'s numbers under `key`'s channel names: a point entering from, or folding into, a neighbour. */
function as(key: string, point: GeometryPoint): GeometryPoint {
	return { ...point, key };
}

/** The nearest of `order` around `index` that `has` knows: looking back first, then ahead. */
function neighbour(
	order: readonly string[],
	index: number,
	has: ReadonlyMap<string, GeometryPoint>,
): GeometryPoint | undefined {
	for (let at = index - 1; at >= 0; at -= 1) {
		const found = has.get(order[at] as string);
		if (found) return found;
	}
	for (let at = index + 1; at < order.length; at += 1) {
		const found = has.get(order[at] as string);
		if (found) return found;
	}
	return undefined;
}

/** The new keys, with the ones that left kept after the old point before them. */
function mergeOrder(
	before: readonly string[],
	after: readonly string[],
): string[] {
	const merged = [...after];
	const known = new Set(after);
	for (const [index, key] of before.entries()) {
		if (known.has(key)) continue;
		const previous = before[index - 1];
		merged.splice(
			previous === undefined ? 0 : merged.indexOf(previous) + 1,
			0,
			key,
		);
		known.add(key);
	}
	return merged;
}

/**
 * Points keyed by x. A point that appears enters from its nearest old
 * neighbour (a month added on the right slides out of the last one); a
 * point that leaves folds into its nearest new neighbour. Undefined when the
 * runs don't line up: the caller falls back to tweening the path.
 */
function pointsPlan(from: Points, to: Points): GeometryPlan | undefined {
	if (from.runs.length !== to.runs.length || from.shape !== to.shape)
		return undefined;
	const starts = new Map<string, number>();
	const targets = new Map<string, number>();
	const orders = to.runs.map((run, index): string[] | undefined => {
		const old = new Map(
			(from.runs[index] ?? []).map((point) => [point.key, point]),
		);
		const next = new Map(run.map((point) => [point.key, point]));
		// Two points under one key can't be told apart: tween the path instead.
		if (
			old.size !== (from.runs[index]?.length ?? 0) ||
			next.size !== run.length
		) {
			return undefined;
		}
		const order = mergeOrder([...old.keys()], [...next.keys()]);
		for (const [at, key] of order.entries()) {
			const target = next.get(key) ?? neighbour(order, at, next);
			const start = old.get(key) ?? neighbour(order, at, old) ?? target;
			if (target === undefined || start === undefined) continue;
			fields(as(key, start), starts);
			fields(as(key, target), targets);
		}
		return order;
	});
	if (orders.some((order) => order === undefined)) return undefined;
	return {
		starts,
		targets,
		build(value) {
			const area = to.runs.some((run) => run[0]?.y0 !== undefined);
			return {
				...to,
				runs: (orders as string[][]).map((order) =>
					order.map((key) => ({
						key,
						x: value(channel(key, "x")),
						y: value(channel(key, "y")),
						...(area
							? { x0: value(channel(key, "x0")), y0: value(channel(key, "y0")) }
							: {}),
					})),
				),
			};
		},
	};
}

function arcPlan(from: Arc, to: Arc): GeometryPlan {
	const record = (arc: Arc) =>
		new Map(ARC_FIELDS.map((field) => [field as string, arc[field]]));
	return {
		starts: record(from),
		targets: record(to),
		build: (value) =>
			Object.fromEntries([
				["kind", "arc"],
				...ARC_FIELDS.map((field) => [field, value(field)]),
			]) as Arc,
	};
}

/** How `from` (what is painted) becomes `to`, channel by channel. */
export function geometryPlan(
	from: SceneGeometry,
	to: SceneGeometry,
): GeometryPlan | undefined {
	if (from.kind === "arc" && to.kind === "arc") return arcPlan(from, to);
	if (from.kind === "points" && to.kind === "points")
		return pointsPlan(from, to);
	return undefined;
}

/** A line's length along its points: what Canvas dashes against to trace it in. */
export function geometryLength(geometry: SceneGeometry): number {
	if (geometry.kind !== "points") return 0;
	let length = 0;
	for (const run of geometry.runs) {
		for (let index = 1; index < run.length; index += 1) {
			const a = run[index - 1] as GeometryPoint;
			const b = run[index] as GeometryPoint;
			length += Math.hypot(b.x - a.x, b.y - a.y);
		}
	}
	// A curve runs a little longer than its chords; the dash must cover it all.
	return length * 1.1;
}
