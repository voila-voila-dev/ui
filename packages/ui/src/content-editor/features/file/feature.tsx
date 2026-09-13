import { createPlatePlugin } from "platejs/react";
import type { ContentFeature } from "#/content-editor/features/feature-definition.tsx";
import { fileReader } from "#/content-editor/features/file/reader.tsx";

export const FilePlugin = createPlatePlugin({
	key: "file",
	node: { isElement: true, isVoid: true },
});

/** Insertion and editing come with the file element and its popover. */
export const fileFeature: ContentFeature = {
	...fileReader,
	plugins: () => [FilePlugin],
};
