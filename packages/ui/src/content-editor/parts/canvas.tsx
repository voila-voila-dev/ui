import { PlateContent, type PlateContentProps } from "platejs/react";
import { useContentEditorConfig } from "#/content-editor/context/content-editor-context.tsx";
import { useRegisterContentEditorPart } from "#/content-editor/parts/layout.tsx";
import { cn } from "#/lib/utils.ts";

interface Props extends Omit<PlateContentProps, "placeholder" | "readOnly"> {
	/** Shown in the empty document; defaults to the `chrome.placeholder` label. */
	placeholder?: string;
}

/** The editable surface: the document, with its placeholder and focus ring. */
export function ContentEditorCanvas({
	className,
	placeholder,
	...props
}: Props) {
	const { labels, mode, readOnly } = useContentEditorConfig();
	useRegisterContentEditorPart("canvas");
	return (
		<PlateContent
			data-slot="content-editor-canvas"
			placeholder={placeholder ?? labels.chrome.placeholder}
			readOnly={readOnly}
			aria-label={labels.chrome.editor}
			aria-multiline={mode !== "single-line"}
			className={cn(
				"min-h-(--content-editor-min-height) w-full max-w-(--content-editor-prose-width) rounded-md px-3 py-2 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring/50 data-[mode=single-line]:min-h-0",
				"[&_[data-slate-node=element]+[data-slate-node=element]]:mt-(--content-editor-block-gap)",
				className,
			)}
			{...props}
		/>
	);
}
ContentEditorCanvas.slot = "main" as const;
