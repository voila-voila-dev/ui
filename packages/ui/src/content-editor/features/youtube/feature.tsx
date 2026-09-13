import { createPlatePlugin } from "platejs/react";
import type { ContentFeature } from "#/content-editor/features/feature-definition.tsx";
import { youtubeReader } from "#/content-editor/features/youtube/reader.tsx";

export const YoutubeVideoPlugin = createPlatePlugin({
	key: "youtube-video",
	node: { isElement: true, isVoid: true },
});

/** Insertion and editing come with the youtube element and its popover. */
export const youtubeFeature: ContentFeature = {
	...youtubeReader,
	plugins: () => [YoutubeVideoPlugin],
};
