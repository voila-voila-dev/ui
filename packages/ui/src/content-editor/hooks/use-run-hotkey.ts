import { isHotkey } from "platejs";
import { useEditorRef } from "platejs/react";
import type { KeyboardEvent } from "react";
import { useContentEditorConfig } from "#/content-editor/context/content-editor-context.tsx";
import { focusInspectorFor } from "#/content-editor/lib/popover-hosts.ts";

/**
 * Does what pressing a toolbar item does when its `hotkey` is pressed: runs
 * it, or opens its form. Returns whether the key belonged to an item, so the
 * caller keeps it from the browser (⌘K focuses the address bar in some).
 */
export function useRunHotkey(): (event: KeyboardEvent) => boolean {
	const editor = useEditorRef();
	const { registry, capabilities, labels, uploadImage, readOnly, popovers } =
		useContentEditorConfig();
	return (event) => {
		const item = [
			...registry.toolbarItems(capabilities),
			...registry.floatingItems(capabilities),
		].find(
			(candidate) =>
				candidate.hotkey !== undefined && isHotkey(candidate.hotkey, event),
		);
		if (item === undefined) {
			return false;
		}
		if (readOnly || (item.isDisabled?.(editor) ?? false)) {
			return true;
		}
		if (item.Popover !== undefined) {
			if (!focusInspectorFor(item, editor, popovers)) {
				popovers.open(item.key);
			}
		} else {
			item.run(editor, { labels, uploadImage });
		}
		return true;
	};
}
