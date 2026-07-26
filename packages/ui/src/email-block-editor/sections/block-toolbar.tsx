import {
	CopyIcon,
	SlidersHorizontalIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import type { SortableBlockHandle } from "#/email-block-editor/dnd/sortable-block-list.tsx";
import type { EmailEditorBlockType } from "#/email-block-editor/document/types.ts";
import { RichTextControls } from "#/email-block-editor/sections/rich-text-controls.tsx";
import { selectedAnchorElement } from "#/email-block-editor/sections/selection-link-button.tsx";
import { StructureControls } from "#/email-block-editor/sections/structure-controls.tsx";
import { ToolbarIconButton } from "#/email-block-editor/sections/toolbar-icon-button.tsx";
import { ToolbarSeparator } from "#/email-block-editor/sections/toolbar-separator.tsx";
import { cn } from "#/lib/utils.ts";

/** Track which marks are active at the caret, following the live selection. */
const useActiveInlineMarks = (): ReadonlySet<string> => {
	const [active, setActive] = useState<ReadonlySet<string>>(new Set());
	useEffect(() => {
		const readSelection = () => {
			const next = new Set<string>();
			for (const command of INLINE_MARKS) {
				if (document.queryCommandState(command)) {
					next.add(command);
				}
			}
			if (selectedAnchorElement() !== null) {
				next.add("link");
			}
			setActive(next);
		};
		document.addEventListener("selectionchange", readSelection);
		readSelection();
		return () => document.removeEventListener("selectionchange", readSelection);
	}, []);
	return active;
};
interface Props {
	handle: SortableBlockHandle;
	/** Show the bold/italic/underline/link group (paragraph blocks). */
	richText: boolean;
	/** Touch pointer: grow every target to 44px. */
	coarsePointer: boolean;
	/** Restricts the add-below menu; a grid cell offers the leaf types only. */
	addableTypes?: ReadonlyArray<EmailEditorBlockType>;
	onAddBelow: (type: EmailEditorBlockType) => void;
	onDuplicate: () => void;
	onRemove: () => void;
	/** Present when the settings are in a sheet; opens it for this block. */
	onOpenSettings?: () => void;
	/** Present for a block inside a grid: selects the grid, which is otherwise
	 * only reachable through the thin band around its cells. */
	onSelectContainer?: () => void;
}
/**
 * The controls of the selected block: add-below, drag handle, inline
 * formatting when the block holds rich text, duplicate, delete, plus a
 * Settings button when the settings live in a bottom sheet rather than in
 * the sidebar. App-chrome styling on purpose — the toolbar is editor UI, not
 * part of the email. Only ever rendered for the selected block, so a single
 * toolbar is visible at a time.
 *
 * At 44px per target the full set is wider than a 390px viewport, so the row
 * wraps under a touch pointer rather than scrolling: it sits in the flow there
 * (see the canvas), so a second line costs nothing, while a scrolling row
 * would hide Delete behind an edge with no affordance.
 */
export function BlockToolbar({
	handle,
	richText,
	coarsePointer,
	addableTypes,
	onAddBelow,
	onDuplicate,
	onRemove,
	onOpenSettings,
	onSelectContainer,
}: Props) {
	const activeMarks = useActiveInlineMarks();
	return (
		<div
			className={cn(
				"flex max-w-full items-center gap-0.5 rounded-md border bg-background p-0.5 shadow-sm",
				coarsePointer ? "flex-wrap justify-start" : "flex-nowrap",
			)}
		>
			<StructureControls
				handle={handle}
				coarsePointer={coarsePointer}
				addableTypes={addableTypes}
				onAddBelow={onAddBelow}
				onSelectContainer={onSelectContainer}
			/>
			{richText ? (
				<RichTextControls active={activeMarks} coarsePointer={coarsePointer} />
			) : null}
			<ToolbarSeparator />
			{onOpenSettings ? (
				<ToolbarIconButton
					label="Block settings"
					coarsePointer={coarsePointer}
					onClick={onOpenSettings}
				>
					<SlidersHorizontalIcon aria-hidden />
				</ToolbarIconButton>
			) : null}
			<ToolbarIconButton
				label="Duplicate block"
				coarsePointer={coarsePointer}
				onClick={onDuplicate}
			>
				<CopyIcon aria-hidden />
			</ToolbarIconButton>
			<ToolbarIconButton
				label="Delete block"
				coarsePointer={coarsePointer}
				onClick={onRemove}
			>
				<TrashIcon aria-hidden />
			</ToolbarIconButton>
		</div>
	);
}

/**
 * Run a document.execCommand-based inline formatting command against the
 * current text selection, then poke the surrounding contentEditable's `input`
 * handler so the paragraph block re-reads the DOM into the span model. The
 * toolbar buttons prevent mousedown default so the text selection (and focus)
 * survive the click.
 */
export const applyInlineFormat = (command: string, value?: string) => {
	document.execCommand("styleWithCSS", false, "false");
	document.execCommand(command, false, value);
	const node = window.getSelection()?.anchorNode;
	const element = node instanceof Element ? node : node?.parentElement;
	element
		?.closest("[contenteditable]")
		?.dispatchEvent(new Event("input", { bubbles: true }));
};
export const keepSelection = (event: { preventDefault: () => void }) =>
	event.preventDefault();
export const INLINE_MARKS = ["bold", "italic", "underline"] as const;
/**
 * Tap targets reach the 44px floor on touch pointers and stay compact under a
 * mouse. `size-11` overrides the size variant's `size-*` through
 * tailwind-merge, so the two never fight.
 */
export const toolbarButtonClassName = (
	coarsePointer: boolean,
	active = false,
) =>
	cn(
		"shrink-0",
		coarsePointer && "size-11",
		active && "bg-accent text-accent-foreground",
	);
