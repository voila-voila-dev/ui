import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { defineChart } from "#/core/define-chart.ts";
import { barY } from "#/core/marks/bar.ts";
import { lineY } from "#/core/marks/line.ts";
import { Chart } from "#/react/chart.tsx";

let root: Root | null = null;
let host: HTMLDivElement | null = null;

async function mount(element: React.ReactNode) {
	host = document.createElement("div");
	host.style.width = "480px";
	document.body.append(host);
	root = createRoot(host);
	await act(async () => root?.render(element));
	return host;
}

function wait(ms: number) {
	return act(() => new Promise((resolve) => setTimeout(resolve, ms)));
}

afterEach(async () => {
	await act(async () => root?.unmount());
	host?.remove();
	root = null;
	host = null;
});

describe("motion in the SVG renderer", () => {
	it("traces a line in on the first render, then leaves it whole", async () => {
		const container = await mount(
			<Chart
				ariaLabel="Missions"
				definition={defineChart({
					marks: [lineY([4, 8, 6, 9], { enter: "draw", label: "Missions" })],
				})}
			/>,
		);
		const line = () =>
			container.querySelector("[data-slot=chart-svg] path[data-role=mark]");
		// The first frame, painted in the layout effect: the line has barely begun.
		expect(line()?.getAttribute("pathLength")).toBe("1");
		expect(Number(line()?.getAttribute("stroke-dashoffset"))).toBeGreaterThan(
			0.9,
		);
		await wait(1500);
		expect(line()?.hasAttribute("pathLength")).toBe(false);
	});

	it("grows a new bar from the baseline", async () => {
		function bars(values: number[]) {
			return defineChart({
				y: { domain: [0, 40] },
				marks: [
					barY(
						values.map((value, index) => ({ city: `c${index}`, value })),
						{ x: "city", y: "value", label: "Clubs", radius: 0 },
					),
				],
			});
		}
		const container = await mount(
			<Chart ariaLabel="Clubs" definition={bars([10, 20])} />,
		);
		await act(async () =>
			root?.render(<Chart ariaLabel="Clubs" definition={bars([10, 20, 30])} />),
		);
		const third = () =>
			[
				...container.querySelectorAll("[data-slot=chart-svg] [data-role=mark]"),
			][2];
		// The first frame is painted in the layout effect: the bar sits flat on its baseline.
		const early = third()?.getBoundingClientRect().height ?? 0;
		await wait(1500);
		const settled = third()?.getBoundingClientRect().height ?? 0;
		expect(settled).toBeGreaterThan(100);
		expect(early).toBeLessThan(1);
	});
});
