import { ContentEditorCanvas } from "#/content-editor/parts/canvas.tsx";
import { ContentEditorCharacterCount } from "#/content-editor/parts/character-count.tsx";
import { ContentEditorFloatingToolbar } from "#/content-editor/parts/floating-toolbar.tsx";
import { ContentEditorLayout } from "#/content-editor/parts/layout.tsx";
import { ContentEditorRoot } from "#/content-editor/parts/root.tsx";
import { ContentEditorToolbar } from "#/content-editor/parts/toolbar.tsx";
import { ContentEditorToolbarGroup } from "#/content-editor/parts/toolbar-group.tsx";
import { ContentEditorToolbarItem } from "#/content-editor/parts/toolbar-item.tsx";

/**
 * The content editor parts as one namespace, in composition order: the
 * Root provides, the Layout arranges, the Canvas is the document, and the
 * rest is chrome.
 */
export const ContentEditor = {
	Root: ContentEditorRoot,
	Layout: ContentEditorLayout,
	Toolbar: ContentEditorToolbar,
	ToolbarGroup: ContentEditorToolbarGroup,
	ToolbarItem: ContentEditorToolbarItem,
	Canvas: ContentEditorCanvas,
	FloatingToolbar: ContentEditorFloatingToolbar,
	CharacterCount: ContentEditorCharacterCount,
};
