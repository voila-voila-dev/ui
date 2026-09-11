// @vitest-environment jsdom
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "#/button/components/button.tsx";
import { Dialog } from "#/dialog/components/dialog.tsx";
import {
	PortalContainerProvider,
	usePortalContainer,
	usePortalContainerNode,
} from "#/portal-container/components/portal-container.tsx";
import { Tooltip } from "#/tooltip/components/tooltip.tsx";

afterEach(cleanup);

function Island() {
	const root = useRef<HTMLDivElement | null>(null);
	return (
		<div data-testid="island" ref={root}>
			<PortalContainerProvider container={root}>
				<Dialog.Root>
					<Dialog.Trigger render={<Button variant="outline" />}>
						Cancel project
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Title>Cancel this project?</Dialog.Title>
					</Dialog.Content>
				</Dialog.Root>
			</PortalContainerProvider>
		</div>
	);
}

function ReadContainer() {
	const container = usePortalContainer();
	const node = usePortalContainerNode();
	return (
		<span data-testid="read">
			{container === undefined ? "none" : "set"}/
			{node instanceof HTMLElement ? node.tagName : "null"}
		</span>
	);
}

describe("PortalContainerProvider", () => {
	it("renders portaled overlays inside the container", async () => {
		const screen = render(<Island />);
		fireEvent.click(screen.getByRole("button", { name: "Cancel project" }));
		await waitFor(() => {
			const dialog = screen.getByRole("dialog");
			expect(screen.getByTestId("island").contains(dialog)).toBe(true);
		});
	});

	it("lets an explicit container prop win over the context", async () => {
		const elsewhere = document.createElement("div");
		document.body.appendChild(elsewhere);
		const island = document.createElement("div");
		document.body.appendChild(island);
		const screen = render(
			<PortalContainerProvider container={island}>
				<Dialog.Root>
					<Dialog.Trigger render={<Button variant="outline" />}>
						Open
					</Dialog.Trigger>
					<Dialog.Portal container={elsewhere}>
						<Dialog.Overlay />
						<Dialog.Title>Elsewhere</Dialog.Title>
					</Dialog.Portal>
				</Dialog.Root>
			</PortalContainerProvider>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		await waitFor(() => {
			expect(elsewhere.textContent).toContain("Elsewhere");
			expect(island.textContent).not.toContain("Elsewhere");
		});
	});

	it("falls back to the document body without a provider", async () => {
		const screen = render(
			<Tooltip.Root open>
				<Tooltip.Trigger render={<Button variant="outline" />}>
					Hover
				</Tooltip.Trigger>
				<Tooltip.Content>A tip</Tooltip.Content>
			</Tooltip.Root>,
		);
		await waitFor(() => {
			const tip = screen.getByText("A tip");
			expect(screen.container.contains(tip)).toBe(false);
			expect(document.body.contains(tip)).toBe(true);
		});
	});
});

describe("usePortalContainer", () => {
	it("reads undefined without a provider and the node with one", () => {
		const bare = render(<ReadContainer />);
		expect(bare.getByTestId("read").textContent).toBe("none/null");
		cleanup();
		const target = document.createElement("section");
		const wrapped = render(
			<PortalContainerProvider container={target}>
				<ReadContainer />
			</PortalContainerProvider>,
		);
		expect(wrapped.getByTestId("read").textContent).toBe("set/SECTION");
	});
});
