import { DownloadSimpleIcon } from "@phosphor-icons/react";
import type { Table as TanstackTable } from "@tanstack/react-table";
import { Button } from "#/button/components/button.tsx";
import { dataTableToCsv } from "#/datatable/libs/to-csv.ts";

interface Props<TData> {
	table: TanstackTable<TData>;
	filename?: string;
	label?: string;
	className?: string;
}

/** Downloads the current view as CSV. */
export function DataTableExport<TData>({
	table,
	filename = "export.csv",
	label = "Export",
	className,
}: Props<TData>) {
	const download = () => {
		const blob = new Blob([dataTableToCsv(table)], {
			type: "text/csv;charset=utf-8",
		});
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = filename;
		anchor.click();
		URL.revokeObjectURL(url);
	};
	return (
		<Button
			variant="outline"
			size="sm"
			className={className}
			onClick={download}
		>
			<DownloadSimpleIcon />
			{label}
		</Button>
	);
}
