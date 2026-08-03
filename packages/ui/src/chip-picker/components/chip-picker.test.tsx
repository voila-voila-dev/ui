// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ChipPicker } from "#/chip-picker/components/chip-picker.tsx";

beforeEach(() => {
	Object.defineProperty(window, "innerWidth", {
		configurable: true,
		writable: true,
		value: 1280,
	});
	// jsdom has no matchMedia; the responsive sheet's useIsMobile needs it.
	vi.stubGlobal(
		"matchMedia",
		vi.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			addEventListener: () => {},
			removeEventListener: () => {},
		})),
	);
});

afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});

const labels = {
	add: "Add",
	done: "Done",
	noResult: "No result.",
	selectionCount: (count: number) => `${count} selected`,
};

const options = [
	{ id: "cooking", label: "Cooking" },
	{ id: "boxing", label: "Boxing" },
	{ id: "singing", label: "Singing" },
];

function renderPicker(overrides?: {
	selected?: ReadonlySet<string>;
	onToggle?: (id: string) => void;
	maxSelected?: number;
}) {
	return render(
		<ChipPicker
			title="Your interests"
			searchPlaceholder="Search…"
			labels={labels}
			options={options}
			selected={overrides?.selected ?? new Set()}
			onToggle={overrides?.onToggle ?? (() => {})}
			maxSelected={overrides?.maxSelected}
		/>,
	);
}

describe("ChipPicker", () => {
	it("collapses to the selected chips plus the add trigger", () => {
		renderPicker({ selected: new Set(["cooking"]) });
		expect(screen.getByText("Cooking")).toBeDefined();
		expect(screen.queryByText("Boxing")).toBeNull();
		expect(screen.getByRole("button", { name: "Add" })).toBeDefined();
	});

	it("opens the sheet with every option sorted alphabetically", () => {
		renderPicker();
		fireEvent.click(screen.getByRole("button", { name: "Add" }));
		const rows = screen
			.getAllByRole("button", { pressed: false })
			.map((row) => row.textContent);
		expect(rows).toEqual(["Boxing", "Cooking", "Singing"]);
	});

	it("filters the list from the search field", () => {
		renderPicker();
		fireEvent.click(screen.getByRole("button", { name: "Add" }));
		fireEvent.change(screen.getByPlaceholderText("Search…"), {
			target: { value: "sing" },
		});
		expect(screen.queryByText("Cooking")).toBeNull();
		expect(screen.getByText("Singing")).toBeDefined();
	});

	it("shows the capped counter and reports row toggles", () => {
		const toggledIds: string[] = [];
		renderPicker({
			selected: new Set(["cooking"]),
			onToggle: (id) => toggledIds.push(id),
			maxSelected: 2,
		});
		fireEvent.click(screen.getByRole("button", { name: "Add" }));
		expect(screen.getByText("1 / 2")).toBeDefined();
		fireEvent.click(screen.getByRole("button", { name: "Boxing" }));
		expect(toggledIds).toEqual(["boxing"]);
	});

	it("disables the add trigger once the cap is reached", () => {
		renderPicker({ selected: new Set(["cooking"]), maxSelected: 1 });
		expect(screen.getByRole("button", { name: "Add" })).toHaveProperty(
			"disabled",
			true,
		);
	});
});
