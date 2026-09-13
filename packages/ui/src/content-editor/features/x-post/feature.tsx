import { createPlatePlugin } from "platejs/react";
import type { ContentFeature } from "#/content-editor/features/feature-definition.tsx";
import { xPostReader } from "#/content-editor/features/x-post/reader.tsx";

export const XPostPlugin = createPlatePlugin({
	key: "x-post",
	node: { isElement: true, isVoid: true },
});

/** Insertion and editing come with the x-post element and its popover. */
export const xPostFeature: ContentFeature = {
	...xPostReader,
	plugins: () => [XPostPlugin],
};
