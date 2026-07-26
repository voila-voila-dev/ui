import {
	TextBIcon,
	TextItalicIcon,
	TextUnderlineIcon,
} from "@phosphor-icons/react";
import {
	applyInlineFormat,
	keepSelection,
} from "#/email-block-editor/sections/block-toolbar.tsx";
import { SelectionLinkButton } from "#/email-block-editor/sections/selection-link-button.tsx";
import { ToolbarIconButton } from "#/email-block-editor/sections/toolbar-icon-button.tsx";
import { ToolbarSeparator } from "#/email-block-editor/sections/toolbar-separator.tsx";

interface Props {
	active: ReadonlySet<string>;
	coarsePointer: boolean;
}

export function RichTextControls({ active, coarsePointer }: Props) {
	return (
		<>
			<ToolbarSeparator />
			<ToolbarIconButton
				label="Bold"
				active={active.has("bold")}
				coarsePointer={coarsePointer}
				onMouseDown={keepSelection}
				onClick={() => applyInlineFormat("bold")}
			>
				<TextBIcon aria-hidden />
			</ToolbarIconButton>
			<ToolbarIconButton
				label="Italic"
				active={active.has("italic")}
				coarsePointer={coarsePointer}
				onMouseDown={keepSelection}
				onClick={() => applyInlineFormat("italic")}
			>
				<TextItalicIcon aria-hidden />
			</ToolbarIconButton>
			<ToolbarIconButton
				label="Underline"
				active={active.has("underline")}
				coarsePointer={coarsePointer}
				onMouseDown={keepSelection}
				onClick={() => applyInlineFormat("underline")}
			>
				<TextUnderlineIcon aria-hidden />
			</ToolbarIconButton>
			<SelectionLinkButton
				active={active.has("link")}
				coarsePointer={coarsePointer}
			/>
		</>
	);
}
