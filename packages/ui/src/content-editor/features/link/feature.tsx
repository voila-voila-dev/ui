import { LinkPlugin } from "@platejs/link/react";
import { PlateElement, type PlateElementProps } from "platejs/react";
import type { ContentFeature } from "#/content-editor/features/feature-definition.tsx";
import { linkReader } from "#/content-editor/features/link/reader.tsx";

/**
 * Rendered as `<a>` so a link stays in the inline flow; Plate's default
 * element is a `<div>`, which would break a pasted link onto its own line.
 * `href` and `target` come through `attributes` from `getLinkAttributes`.
 */
export function LinkElement(props: PlateElementProps) {
	return (
		<PlateElement
			{...props}
			as="a"
			className="text-primary underline underline-offset-2"
		/>
	);
}

/** The link form itself is a toolbar popover, added with the toolbar parts. */
export const linkFeature: ContentFeature = {
	...linkReader,
	plugins: () => [LinkPlugin],
	components: { a: LinkElement },
	allowIn: () => true,
};
