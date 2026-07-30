/**
 * The sidebar's section order, ported from the old Starlight `sidebar` config.
 * Pages inside a section are ordered by their `sidebar.order` frontmatter, then
 * alphabetically.
 *
 * This used to also carry an `order` array pinning an explicit page sequence
 * per section, which meant page order lived in two places. The `start` pages
 * were ordered by the pin and carried no `sidebar` block at all — the only six
 * pages of 194 like that, and the reason nothing noticed they were missing one.
 * The pin is gone; the frontmatter is the single source.
 */
export interface DocsSectionConfig {
	/** Human label shown as the group heading. */
	label: string;
	/** Directory under `src/content/docs` that feeds the section. */
	dir: string;
	/** Whether the group starts collapsed when it has no active page. */
	collapsed: boolean;
}

export const docsSections: DocsSectionConfig[] = [
	{ label: "Start", dir: "start", collapsed: false },
	{ label: "@voila.dev/ui", dir: "ui", collapsed: true },
	{ label: "ui/icon", dir: "ui-icon", collapsed: true },
	{ label: "ui/design-tokens", dir: "ui-tokens", collapsed: true },
	{ label: "ui/chart", dir: "ui-chart", collapsed: true },
	{ label: "ui/datatable", dir: "ui-datatable", collapsed: true },
	{ label: "ui/spreadsheet", dir: "ui-spreadsheet", collapsed: true },
	{ label: "ui/map", dir: "ui-map", collapsed: true },
	{ label: "ui/filter", dir: "ui-filter", collapsed: true },
	{ label: "ui/landing", dir: "ui-landing", collapsed: true },
	{
		label: "ui/email-block-editor",
		dir: "ui-email-block-editor",
		collapsed: true,
	},
];
