import {
	PlateContent,
	type PlateContentProps,
	useEditorRef,
} from "platejs/react";
import { useRegisterContentEditorPart } from "#/content-editor/components/layout.tsx";
import { useContentEditorConfig } from "#/content-editor/context/content-editor-context.tsx";
import { dispatchFiles, filesOf } from "#/content-editor/lib/files.ts";
import { cn } from "#/lib/utils.ts";

interface Props extends Omit<PlateContentProps, "placeholder" | "readOnly"> {
	/** Shown in the empty document; defaults to the `chrome.placeholder` label. */
	placeholder?: string;
}

/**
 * The editable surface: the document, with its placeholder and focus ring.
 * A drop or a paste that carries files goes to the feature that takes them
 * (an image to the image feature), in the capture phase so slate-react's own
 * drop handling never sees it. What no feature takes is dropped rather than
 * handed to Plate, which would try to resolve a range under a file; text
 * keeps Plate's own handling.
 */
export function ContentEditorCanvas({
	className,
	placeholder,
	onDropCapture,
	onPasteCapture,
	...props
}: Props) {
	const editor = useEditorRef();
	const { registry, capabilities, labels, uploadImage, mode, readOnly } =
		useContentEditorConfig();
	useRegisterContentEditorPart("canvas");

	const takeFiles = (transfer: DataTransfer | null): boolean => {
		const files = filesOf(transfer);
		if (files.length === 0) {
			return false;
		}
		if (!readOnly) {
			dispatchFiles(editor, files, registry.fileHandlers(capabilities), {
				labels,
				uploadImage,
			});
		}
		return true;
	};

	return (
		<PlateContent
			data-slot="content-editor-canvas"
			placeholder={placeholder ?? labels.chrome.placeholder}
			readOnly={readOnly}
			aria-label={labels.chrome.editor}
			aria-multiline={mode !== "single-line"}
			onDropCapture={(event) => {
				if (takeFiles(event.dataTransfer)) {
					event.preventDefault();
					event.stopPropagation();
					return;
				}
				onDropCapture?.(event);
			}}
			onPasteCapture={(event) => {
				if (takeFiles(event.clipboardData)) {
					event.preventDefault();
					event.stopPropagation();
					return;
				}
				onPasteCapture?.(event);
			}}
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
