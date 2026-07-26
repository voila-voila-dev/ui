import { ImageIcon } from "@phosphor-icons/react";
import type { EmailBlockDefinition } from "#/email-block-editor/blocks/block-definitions.tsx";
import { ImageBlockSettings } from "#/email-block-editor/blocks/image-block-settings.tsx";
import { ImageBlockView } from "#/email-block-editor/blocks/image-block-view.tsx";
import type {
	EmailEditorImageBlock,
	EmailEditorImageWidth,
} from "#/email-block-editor/document/types.ts";

/**
 * How much of the card's inner width each option occupies. `contained` is the
 * option for a visual that should not bleed edge to edge (a logo, a portrait);
 * the renderer uses the same ratio against the 536px content width.
 */
export const EMAIL_IMAGE_WIDTH_RATIO: {
	readonly [W in EmailEditorImageWidth]: number;
} = { full: 1, contained: 0.6 };
export const imageBlockDefinition: EmailBlockDefinition<EmailEditorImageBlock> =
	{
		label: "Image",
		icon: ImageIcon,
		View: ImageBlockView,
		Settings: ImageBlockSettings,
	};
