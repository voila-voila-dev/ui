import {
	type ColumnDef,
	DataTable,
	type DataTableView,
} from "@voila.dev/ui/data-table";
import { useState } from "react";

interface Organization {
	name: string;
	activity: string;
	logo?: string;
}

function logo(initials: string, background: string) {
	return `data:image/svg+xml;utf8,${encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" rx="20" fill="${background}"/><text x="48" y="61" font-family="system-ui, sans-serif" font-size="34" font-weight="600" fill="#fff" text-anchor="middle">${initials}</text></svg>`,
	)}`;
}

const ORGANIZATIONS: Organization[] = [
	{ name: "Riverside Rowing", activity: "Rowing", logo: logo("RR", "#0e7490") },
	{ name: "Northgate Chess", activity: "Chess", logo: logo("NC", "#7c3aed") },
	{
		name: "Harbour Runners",
		activity: "Athletics",
		logo: logo("HR", "#ea580c"),
	},
	{ name: "Eastfield Tennis", activity: "Tennis", logo: logo("ET", "#16a34a") },
	{ name: "Southbank Judo", activity: "Judo", logo: logo("SJ", "#dc2626") },
	{ name: "Old Town Chorale", activity: "Choral singing" },
	{
		name: "Westside Cycling",
		activity: "Cycling",
		logo: logo("WC", "#ca8a04"),
	},
	{
		name: "Lakeside Sailing",
		activity: "Sailing",
		logo: logo("LS", "#2563eb"),
	},
];

const columns: ColumnDef<Organization>[] = [
	{ accessorKey: "name", header: "Name" },
	{ accessorKey: "activity", header: "Activity" },
];

export function GalleryView() {
	const [view, setView] = useState<DataTableView>("gallery");
	const [search, setSearch] = useState("");
	return (
		<div className="w-full">
			<DataTable.Root
				columns={columns}
				data={ORGANIZATIONS}
				globalFilter={search}
				view={view}
				renderGalleryCard={(organization) => (
					<DataTable.GalleryCard
						src={organization.logo}
						name={organization.name}
						activity={organization.activity}
					/>
				)}
				toolbar={
					<DataTable.Toolbar>
						<DataTable.Search
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder="Search organizations"
						/>
						<DataTable.Actions>
							<DataTable.ViewToggle view={view} onViewChange={setView} />
						</DataTable.Actions>
					</DataTable.Toolbar>
				}
			/>
		</div>
	);
}
