import {
	ContentEditor,
	type ContentValue,
	createContentFeatures,
} from "@voila.dev/ui/content-editor";
import { useState } from "react";

const FEATURES = [...createContentFeatures({ headings: ["h1", "h2"] })];

const THEME = {
	color: {
		brand: "#0f766e",
		canvas: "#f1f5f9",
		card: "#ffffff",
		ink: "#1f2937",
	},
};

/** The email appearance with the inspector beside it. */
function EmailComposer({ initial }: { readonly initial: ContentValue }) {
	const [value, setValue] = useState<ContentValue | null>(initial);
	return (
		<ContentEditor.Root
			features={FEATURES}
			value={value}
			onChange={setValue}
			appearance="email"
			theme={THEME}
		>
			<div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_16rem]">
				<ContentEditor.Layout>
					<ContentEditor.Toolbar />
					<ContentEditor.Canvas />
				</ContentEditor.Layout>
				<ContentEditor.Inspector className="rounded-lg border border-border p-4" />
			</div>
		</ContentEditor.Root>
	);
}

const text = (value: string) => [{ text: value }];

/** An email's title and a section heading. */
export function Headings() {
	return (
		<EmailComposer
			initial={[
				{ type: "h1", children: text("Your season starts Saturday") },
				{ type: "p", children: text("Type # for a title, ## for a section.") },
				{ type: "h2", children: text("What to bring") },
				{ type: "p", children: text("Your badge and a water bottle.") },
			]}
		/>
	);
}
