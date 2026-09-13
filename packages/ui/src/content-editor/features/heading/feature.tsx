import {
	TextHFourIcon,
	TextHThreeIcon,
	TextHTwoIcon,
} from "@phosphor-icons/react";
import { H2Plugin, H3Plugin, H4Plugin } from "@platejs/basic-nodes/react";
import { PlateElement, type PlateElementProps } from "platejs/react";
import type {
	ContentFeature,
	ContentSlashItem,
	ContentToolbarItem,
} from "#/content-editor/features/feature-definition.tsx";
import {
	type ContentHeadingLevel,
	headingReader,
} from "#/content-editor/features/heading/reader.tsx";

const headingSettings = {
	h2: {
		plugin: H2Plugin,
		icon: TextHTwoIcon,
		label: "heading2",
		className: "font-semibold text-xl leading-tight",
		autoformat: "## ",
	},
	h3: {
		plugin: H3Plugin,
		icon: TextHThreeIcon,
		label: "heading3",
		className: "font-semibold text-lg leading-snug",
		autoformat: "### ",
	},
	h4: {
		plugin: H4Plugin,
		icon: TextHFourIcon,
		label: "heading4",
		className: "font-semibold text-base",
		autoformat: "#### ",
	},
} as const;

function headingElement(level: ContentHeadingLevel) {
	return function HeadingElement(props: PlateElementProps) {
		return (
			<PlateElement
				{...props}
				as={level}
				className={headingSettings[level].className}
			/>
		);
	};
}

export function headingFeature(
	levels: ReadonlyArray<ContentHeadingLevel>,
): ContentFeature {
	const toolbar: ContentToolbarItem[] = levels.map((level) => ({
		key: headingSettings[level].label,
		group: "block",
		icon: headingSettings[level].icon,
		label: headingSettings[level].label,
		isActive: (editor) => editor.api.some({ match: { type: level } }),
		run: (editor) => editor.tf.toggleBlock(level),
	}));
	const slash: ContentSlashItem[] = levels.map((level) => ({
		key: headingSettings[level].label,
		icon: headingSettings[level].icon,
		label: headingSettings[level].label,
		keywords: ["heading", "title", level],
		run: (editor) => editor.tf.toggleBlock(level),
	}));
	return {
		...headingReader(levels),
		plugins: () => levels.map((level) => headingSettings[level].plugin),
		components: Object.fromEntries(
			levels.map((level) => [level, headingElement(level)]),
		),
		autoformat: levels.map((level) => ({
			mode: "block",
			type: level,
			match: headingSettings[level].autoformat,
		})),
		toolbar,
		slash,
	};
}
