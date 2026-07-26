import aubergineCss from "@voila.dev/ui/styles/themes/aubergine.css?url";
import emeraldCss from "@voila.dev/ui/styles/themes/emerald.css?url";
import indigoCss from "@voila.dev/ui/styles/themes/indigo.css?url";
import oceanCss from "@voila.dev/ui/styles/themes/ocean.css?url";
import oliveCss from "@voila.dev/ui/styles/themes/olive.css?url";

/**
 * The themes shipped by @voila.dev/ui, offered as a live switch.
 *
 * A theme is a plain stylesheet of custom properties, so switching one is
 * switching a `<link>` — no class plumbing, no build step, and exactly what a
 * consumer does when they pick a theme in their own app. `default` needs no href
 * because docs.css already imports it; the others layer their overrides on top.
 *
 * `swatch` is the theme's own `--primary` in light mode, hard-coded here so the
 * menu can preview all six at once without mounting six stylesheets.
 */
export type Palette = {
	readonly id: string;
	readonly label: string;
	readonly hint: string;
	readonly href?: string;
	readonly swatch: string;
};

export const PALETTES: readonly Palette[] = [
	{
		id: "default",
		label: "Default",
		hint: "Black & white",
		swatch: "oklch(0.205 0 0)",
	},
	{
		id: "indigo",
		label: "Indigo",
		hint: "Linear, Stripe",
		href: indigoCss,
		swatch: "oklch(0.51 0.23 277)",
	},
	{
		id: "ocean",
		label: "Ocean",
		hint: "Intercom, Atlassian",
		href: oceanCss,
		swatch: "oklch(0.51 0.16 250)",
	},
	{
		id: "emerald",
		label: "Emerald",
		hint: "Supabase, Shopify",
		href: emeraldCss,
		swatch: "oklch(0.52 0.115 160)",
	},
	{
		id: "olive",
		label: "Olive",
		hint: "Notion, Craft",
		href: oliveCss,
		swatch: "oklch(0.47 0.075 122)",
	},
	{
		id: "aubergine",
		label: "Aubergine",
		hint: "Slack",
		href: aubergineCss,
		swatch: "oklch(0.38 0.105 320)",
	},
];

/** Where the stored choice lives, and the id of the injected `<link>`. */
export const PALETTE_STORAGE_KEY = "ui-palette";
export const PALETTE_LINK_ID = "ui-palette-stylesheet";

/** `id` -> stylesheet, for the pre-paint script and the switcher alike. */
export const PALETTE_HREFS: Record<string, string> = Object.fromEntries(
	PALETTES.filter((palette) => palette.href !== undefined).map((palette) => [
		palette.id,
		palette.href as string,
	]),
);

/**
 * Points the injected `<link>` at `id`'s stylesheet, or removes it for the
 * default theme. Idempotent, so calling it with the current palette is free.
 */
export function applyPalette(id: string): void {
	const href = PALETTE_HREFS[id];
	const existing = document.getElementById(PALETTE_LINK_ID);

	if (href === undefined) {
		existing?.remove();
		return;
	}

	if (existing instanceof HTMLLinkElement) {
		if (existing.href !== href) existing.href = href;
		return;
	}

	const link = document.createElement("link");
	link.id = PALETTE_LINK_ID;
	link.rel = "stylesheet";
	link.href = href;
	document.head.append(link);
}
