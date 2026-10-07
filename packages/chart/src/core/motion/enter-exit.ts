import type {
	SceneGeometry,
	SceneNode,
	ScenePath,
	SceneRect,
} from "#/core/types.ts";

/**
 * The shape a data mark grows from when an update adds it, and collapses to
 * when an update removes it: a bar to its baseline, a slice onto its
 * neighbour, an area onto its lower edge. Always a node of the same kind, so
 * the store springs it like any other change. Undefined when the mark has no
 * such shape: it fades in, and is gone at once when it leaves.
 */

type Arc = Extract<SceneGeometry, { kind: "arc" }>;

function collapsedBar(node: SceneRect): SceneRect | undefined {
	const { baseline } = node;
	if (!baseline) return undefined;
	return baseline.axis === "y"
		? { ...node, y: baseline.at, height: 0 }
		: { ...node, x: baseline.at, width: 0 };
}

function arcOf(node: SceneNode | undefined): Arc | undefined {
	return node?.kind === "path" && node.geometry?.kind === "arc"
		? node.geometry
		: undefined;
}

/** Slices of one ring tile it: those are the neighbours a slice opens from and closes onto. */
function sameRing(a: Arc, b: Arc): boolean {
	return (
		a.cx === b.cx &&
		a.cy === b.cy &&
		a.innerRadius === b.innerRadius &&
		a.outerRadius === b.outerRadius
	);
}

function withAngle(node: ScenePath, arc: Arc, angle: number): ScenePath {
	return { ...node, geometry: { ...arc, startAngle: angle, endAngle: angle } };
}

/**
 * The boundary angle next to `node` among the slices of its ring in `order`,
 * read from `known`: the end of the nearest one before it, or the start of the
 * nearest one after it, whichever side `afterFirst` looks at first.
 */
function boundary(
	node: SceneNode,
	order: readonly SceneNode[],
	known: ReadonlyMap<string, SceneNode>,
	arc: Arc,
	afterFirst: boolean,
): number {
	const index = order.findIndex((other) => other.key === node.key);
	function scan(step: -1 | 1): number | undefined {
		for (let at = index + step; at >= 0 && at < order.length; at += step) {
			const other = arcOf(known.get((order[at] as SceneNode).key));
			if (other && sameRing(other, arc)) {
				return step === 1 ? other.startAngle : other.endAngle;
			}
		}
		return undefined;
	}
	const [first, second] = afterFirst ? ([1, -1] as const) : ([-1, 1] as const);
	return scan(first) ?? scan(second) ?? arc.startAngle;
}

function collapsedArea(node: ScenePath): ScenePath | undefined {
	const geometry = node.geometry;
	// A line over an area carries the area's lower edge too, so the two grow as one.
	if (geometry?.kind !== "points" || geometry.runs[0]?.[0]?.y0 === undefined) {
		return undefined;
	}
	return {
		...node,
		geometry: {
			...geometry,
			runs: geometry.runs.map((run) =>
				run.map((point) => ({
					...point,
					x: point.x0 ?? point.x,
					y: point.y0 ?? point.y,
				})),
			),
		},
	};
}

/** Where a node an update adds starts from. `siblings` is the list it sits in, `before` the old scene. */
export function enterFrom(
	node: SceneNode,
	siblings: readonly SceneNode[],
	before: ReadonlyMap<string, SceneNode>,
): SceneNode | undefined {
	if (node.enter !== "grow") return undefined;
	if (node.kind === "rect") return collapsedBar(node);
	const arc = arcOf(node);
	if (arc) {
		return withAngle(
			node as ScenePath,
			arc,
			boundary(node, siblings, before, arc, false),
		);
	}
	return node.kind === "path" ? collapsedArea(node) : undefined;
}

/** Where a node an update removes collapses to. `siblings` is the old list it sat in, `after` the new scene. */
export function exitTo(
	node: SceneNode,
	siblings: readonly SceneNode[],
	after: ReadonlyMap<string, SceneNode>,
): SceneNode | undefined {
	if (node.enter !== "grow") return undefined;
	if (node.kind === "rect") return collapsedBar(node);
	const arc = arcOf(node);
	if (!arc) return undefined;
	// A slice closes onto the one after it, so it takes that one's new start.
	return withAngle(
		node as ScenePath,
		arc,
		boundary(node, siblings, after, arc, true),
	);
}
