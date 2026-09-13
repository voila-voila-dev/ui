import { ContentEditorCanvas } from "#/content-editor/parts/canvas.tsx";
import { ContentEditorCharacterCount } from "#/content-editor/parts/character-count.tsx";
import { ContentEditorLayout } from "#/content-editor/parts/layout.tsx";
import { ContentEditorRoot } from "#/content-editor/parts/root.tsx";

/**
 * The content editor parts as one namespace, in composition order: the
 * Root provides, the Layout arranges, the Canvas is the document, and the
 * rest is chrome.
 */
export const ContentEditor = {
	Root: ContentEditorRoot,
	Layout: ContentEditorLayout,
	Canvas: ContentEditorCanvas,
	CharacterCount: ContentEditorCharacterCount,
};
