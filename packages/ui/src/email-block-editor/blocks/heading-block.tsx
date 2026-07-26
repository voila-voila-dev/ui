import { TextHIcon } from "@phosphor-icons/react";
import type { EmailBlockDefinition } from "#/email-block-editor/blocks/block-definitions.tsx";
import { HeadingBlockSettings } from "#/email-block-editor/blocks/heading-block-settings.tsx";
import { HeadingBlockView } from "#/email-block-editor/blocks/heading-block-view.tsx";
import type {
	EmailEditorHeadingBlock,
	EmailEditorHeadingLevel,
} from "#/email-block-editor/document/types.ts";

/** The two heading sizes, mirroring the domain `emailHeading` component. */
export const EMAIL_HEADING_STYLE: {
	readonly [Level in EmailEditorHeadingLevel]: {
		readonly fontSize: string;
		readonly label: string;
	};
} = {
	1: { fontSize: "22px", label: "Main title (H1)" },
	2: { fontSize: "17px", label: "Subtitle (H2)" },
};
export const headingBlockDefinition: EmailBlockDefinition<EmailEditorHeadingBlock> =
	{
		label: "Heading",
		icon: TextHIcon,
		View: HeadingBlockView,
		Settings: HeadingBlockSettings,
	};
