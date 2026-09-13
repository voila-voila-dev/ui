import { createPlatePlugin } from "platejs/react";
import type { ContentFeature } from "#/content-editor/features/feature-definition.tsx";
import { imageReader } from "#/content-editor/features/image/reader.tsx";

export const ImagePlugin = createPlatePlugin({
	key: "image",
	node: { isElement: true, isVoid: true },
});

/** Insertion, upload, drop and paste come with the image element. */
export const imageFeature: ContentFeature = {
	...imageReader,
	plugins: () => [ImagePlugin],
	requires: ["upload-image"],
};
