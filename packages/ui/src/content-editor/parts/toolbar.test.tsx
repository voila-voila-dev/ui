// @vitest-environment jsdom
import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import type { PlateEditor } from "platejs/react";
import { useEditorRef } from "platejs/react";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { ContentValue } from "#/content-editor/features/content-value.ts";
import { createContentFeatures } from "#/content-editor/features/create-content-features.ts";
import { installContentEditorTestDom } from "#/content-editor/lib/test-dom.ts";
import { ContentEditor } from "#/content-editor/parts/namespace.ts";

beforeEach(installContentEditorTestDom);
afterEach(cleanup);

const FEATURES = createContentFeatures();

let editorRef: PlateEditor | null = null;
function CaptureEditor() {
	editorRef = useEditorRef();
	return null;
}

function EditorUnderTest({ initial }: { readonly initial: ContentValue }) {
	const [value, setValue] = useState<ContentValue | null>(initial);
	return (
		<ContentEditor.Root
			features={FEATURES}
			value={value}
			onChange={setValue}
			onUploadImage={async () => ({ url: "" })}
		>
			<CaptureEditor />
			<ContentEditor.Layout>
				<ContentEditor.Toolbar />
				<ContentEditor.Canvas />
			</ContentEditor.Layout>
		</ContentEditor.Root>
	);
}

const editor = () => editorRef as PlateEditor;
const selectAll = () =>
	act(() => {
		editor().tf.select({
			anchor: { path: [0, 0], offset: 0 },
			focus: { path: [0, 0], offset: 5 },
		});
	});

describe("ContentEditor.Toolbar", () => {
	it("shows every registry item but the table controls, in group order", () => {
		render(
			<EditorUnderTest
				initial={[{ type: "p", children: [{ text: "Hello world" }] }]}
			/>,
		);
		const toolbar = screen.getByRole("toolbar");
		const labels = [...toolbar.querySelectorAll("[aria-label]")].map((node) =>
			node.getAttribute("aria-label"),
		);
		expect(labels.slice(0, 3)).toEqual(["Undo", "Redo", "Bold"]);
		expect(labels).toContain("Heading 2");
		expect(labels).toContain("Bulleted list");
		expect(labels).toContain("Table");
		expect(labels).not.toContain("Add row below");
	});

	it("toggles a mark and reflects it as pressed", async () => {
		render(
			<EditorUnderTest
				initial={[{ type: "p", children: [{ text: "Hello world" }] }]}
			/>,
		);
		selectAll();
		const bold = await screen.findByRole("button", { name: "Bold" });
		act(() => {
			fireEvent.click(bold);
		});
		expect(editor().children[0]?.children[0]).toMatchObject({
			text: "Hello",
			bold: true,
		});
		expect(
			(await screen.findByRole("button", { name: "Bold" })).getAttribute(
				"aria-pressed",
			),
		).toBe("true");
	});

	it("turns the block into a heading and back", () => {
		render(
			<EditorUnderTest
				initial={[{ type: "p", children: [{ text: "Title" }] }]}
			/>,
		);
		selectAll();
		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Heading 2" }));
		});
		expect(editor().children[0]?.type).toBe("h2");
		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Heading 2" }));
		});
		expect(editor().children[0]?.type).toBe("p");
	});

	it("makes a bulleted list item out of the paragraph", () => {
		render(
			<EditorUnderTest
				initial={[{ type: "p", children: [{ text: "Item" }] }]}
			/>,
		);
		selectAll();
		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Bulleted list" }));
		});
		expect(editor().children[0]).toMatchObject({
			type: "p",
			listStyleType: "disc",
		});
	});

	it("inserts a table and then shows the table controls", async () => {
		render(
			<EditorUnderTest
				initial={[{ type: "p", children: [{ text: "Hello" }] }]}
			/>,
		);
		selectAll();
		act(() => {
			fireEvent.click(screen.getByRole("button", { name: "Table" }));
		});
		expect(editor().children.some((node) => node.type === "table")).toBe(true);
		expect(
			await screen.findByRole("button", { name: "Add row below" }),
		).toBeTruthy();
	});

	it("renders no control for a feature the editor does not have", () => {
		function Narrow() {
			const [value, setValue] = useState<ContentValue | null>([
				{ type: "p", children: [{ text: "x" }] },
			]);
			return (
				<ContentEditor.Root
					features={FEATURES.filter(
						(feature) => feature.key !== "table" && feature.key !== "history",
					)}
					value={value}
					onChange={setValue}
				>
					<ContentEditor.Layout>
						<ContentEditor.Toolbar />
						<ContentEditor.Canvas />
					</ContentEditor.Layout>
				</ContentEditor.Root>
			);
		}
		render(<Narrow />);
		expect(screen.queryByRole("button", { name: "Table" })).toBeNull();
		expect(screen.queryByRole("button", { name: "Undo" })).toBeNull();
		expect(screen.getByRole("button", { name: "Bold" })).toBeTruthy();
	});
});
