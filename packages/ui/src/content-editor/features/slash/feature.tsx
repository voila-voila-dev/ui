import { SlashInputPlugin, SlashPlugin } from "@platejs/slash-command/react";
import type { ContentFeature } from "#/content-editor/features/feature-definition.tsx";

/** The menu itself is `ContentEditor.SlashMenu`; this only registers the trigger. */
export const slashFeature: ContentFeature = {
	key: "slash",
	plugins: () => [SlashPlugin, SlashInputPlugin],
	allowIn: (mode) => mode === "block",
};
