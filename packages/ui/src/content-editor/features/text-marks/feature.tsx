import {
	CodeIcon,
	TextBIcon,
	TextItalicIcon,
	TextStrikethroughIcon,
	TextUnderlineIcon,
} from "@phosphor-icons/react";
import {
	BoldPlugin,
	CodePlugin,
	ItalicPlugin,
	StrikethroughPlugin,
	UnderlinePlugin,
} from "@platejs/basic-nodes/react";
import type {
	ContentFeature,
	ContentToolbarItem,
} from "#/content-editor/features/feature-definition.tsx";
import { textMarksReader } from "#/content-editor/features/text-marks/reader.tsx";

function markItem(
	key: string,
	icon: ContentToolbarItem["icon"],
	kbd: ReadonlyArray<string> | undefined,
): ContentToolbarItem {
	return {
		key,
		group: "text",
		icon,
		label: key,
		kbd,
		isActive: (editor) => editor.api.marks()?.[key] === true,
		run: (editor) => editor.tf.toggleMark(key),
	};
}

const items = [
	markItem("bold", TextBIcon, ["⌘", "B"]),
	markItem("italic", TextItalicIcon, ["⌘", "I"]),
	markItem("underline", TextUnderlineIcon, ["⌘", "U"]),
	markItem("strikethrough", TextStrikethroughIcon, undefined),
	markItem("code", CodeIcon, ["⌘", "E"]),
];

export const textMarksFeature: ContentFeature = {
	...textMarksReader,
	plugins: () => [
		BoldPlugin,
		ItalicPlugin,
		UnderlinePlugin,
		StrikethroughPlugin,
		CodePlugin,
	],
	toolbar: items,
	floating: items,
};
