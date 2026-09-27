import type { Meta, StoryObj } from "@storybook/tanstack-react";
import {
	badgeListFeature,
	ContentEditor,
	type ContentEditorAppearance,
	type ContentValue,
	createContentFeatures,
	finePrintFeature,
	highlightFeature,
} from "@voila.dev/ui/content-editor";
import { useState } from "react";

const FEATURES = [
	...createContentFeatures({ headings: ["h1", "h2"] }),
	badgeListFeature,
	highlightFeature,
	finePrintFeature,
];

const BRAND_THEME = {
	color: {
		brand: "#0f766e",
		ink: "#1f2937",
		muted: "#6b7280",
		border: "#e5e7eb",
		card: "#ffffff",
		canvas: "#f1f5f9",
	},
};

const meta = {
	title: "ContentEditor/Email blocks",
	component: ContentEditor.Root,
	parameters: { layout: "padded" },
} satisfies Meta<typeof ContentEditor.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The email appearance with the inspector beside it, as a campaign editor lays it out. */
function Composer({
	initial,
	appearance = "email",
}: {
	readonly initial: ContentValue;
	readonly appearance?: ContentEditorAppearance;
}) {
	const [value, setValue] = useState<ContentValue | null>(initial);
	return (
		<ContentEditor.Root
			features={FEATURES}
			value={value}
			onChange={setValue}
			appearance={appearance}
			theme={BRAND_THEME}
			onUploadImage={async (file) => ({ url: URL.createObjectURL(file) })}
		>
			<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
				<ContentEditor.Layout>
					<ContentEditor.Toolbar />
					<ContentEditor.Canvas />
				</ContentEditor.Layout>
				<ContentEditor.Inspector className="rounded-lg border border-border p-4" />
			</div>
			<ContentEditor.FloatingToolbar />
		</ContentEditor.Root>
	);
}

const noArgs = {
	features: FEATURES,
	value: [],
	onChange: () => {},
	children: null,
};

const text = (value: string) => [{ text: value }];

const headings: ContentValue = [
	{ type: "h1", children: text("Your season starts Saturday") },
	{ type: "p", children: text("Type # for a title, ## for a section.") },
	{ type: "h2", children: text("What to bring") },
	{ type: "p", children: text("Your badge and a water bottle.") },
];

/** `h1` is the email's title, `h2` a section; both in the brand colour. */
export const Headings: Story = {
	args: noArgs,
	render: () => <Composer initial={headings} />,
};

/** The same headings in the document appearance. */
export const HeadingsInADocument: Story = {
	args: noArgs,
	render: () => <Composer initial={headings} appearance="document" />,
};

const item = (listStyleType: string, value: string, listStart?: number) => ({
	type: "p",
	listStyleType,
	indent: 1,
	...(listStart === undefined ? {} : { listStart }),
	children: text(value),
});

const lists: ContentValue = [
	{ type: "p", children: text("Three steps, as badges:") },
	item("badge", "Create your account"),
	item("badge", "Pick a slot", 2),
	item("badge", "Show up on Saturday", 3),
	{ type: "p", children: text("Bullets and numbers stay as they were:") },
	item("disc", "Doors open at 9:00"),
	item("disc", "Bring your badge"),
	{ type: "p", children: text("") },
	item("decimal", "Warm up"),
	item("decimal", "Play", 2),
];

/** The badge list beside the bulleted and numbered ones; `/badge` makes one. */
export const BadgeList: Story = {
	args: noArgs,
	render: () => <Composer initial={lists} />,
};

/** The badge list in the document appearance. */
export const BadgeListInADocument: Story = {
	args: noArgs,
	render: () => <Composer initial={lists} appearance="document" />,
};

const highlights: ContentValue = [
	{
		type: "highlight",
		align: "center",
		children: text("10% off everything with the code LAUNCH10"),
	},
	{ type: "highlight", align: "left", children: text("Aligned left") },
	{ type: "highlight", align: "right", children: text("Aligned right") },
	{ type: "p", children: text("Type /highlight to turn a line into one.") },
];

/** A highlight in each alignment. */
export const Highlight: Story = {
	args: noArgs,
	render: () => <Composer initial={highlights} />,
};

/** The highlights in the document appearance. */
export const HighlightInADocument: Story = {
	args: noArgs,
	render: () => <Composer initial={highlights} appearance="document" />,
};

const finePrint: ContentValue = [
	{ type: "p", children: text("See you on Saturday.") },
	{
		type: "fine-print",
		children: [
			{ text: "Offer valid until 30 June, one per household. " },
			{
				type: "a",
				url: "https://example.com/terms",
				children: text("Terms and conditions"),
			},
			{ text: ".\nYou receive this email because you joined the club." },
		],
	},
];

/** The small print, with a link and a line break. */
export const FinePrint: Story = {
	args: noArgs,
	render: () => <Composer initial={finePrint} />,
};

/** The small print in the document appearance. */
export const FinePrintInADocument: Story = {
	args: noArgs,
	render: () => <Composer initial={finePrint} appearance="document" />,
};
