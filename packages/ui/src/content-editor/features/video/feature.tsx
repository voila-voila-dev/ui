import { createPlatePlugin } from "platejs/react";
import type { ContentFeature } from "#/content-editor/features/feature-definition.tsx";
import { videoReader } from "#/content-editor/features/video/reader.tsx";

export const VideoPlugin = createPlatePlugin({
	key: "video",
	node: { isElement: true, isVoid: true },
});

/** Insertion and editing come with the video element and its popover. */
export const videoFeature: ContentFeature = {
	...videoReader,
	plugins: () => [VideoPlugin],
};
