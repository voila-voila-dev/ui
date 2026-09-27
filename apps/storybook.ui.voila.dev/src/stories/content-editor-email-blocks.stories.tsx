import type { Meta, StoryObj } from "@storybook/tanstack-react";
import {
	ContentEditor,
	type ContentEditorAppearance,
	type ContentValue,
	createContentFeatures,
} from "@voila.dev/ui/content-editor";
import { useState } from "react";

const FEATURES = [...createContentFeatures({ headings: ["h1", "h2"] })];

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
