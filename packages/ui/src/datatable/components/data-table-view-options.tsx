import { ColumnsIcon } from "@phosphor-icons/react";
import type { Table as TanstackTable } from "@tanstack/react-table";
import { Button } from "#/button/components/button.tsx";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

interface Props<TData> {
	table: TanstackTable<TData>;
	label?: string;
	className?: string;
}

/**
 * Column visibility menu. Every hideable column gets a checkbox; the table owns
 * the state unless `columnVisibility` is passed to `DataTable`.
 */
export function DataTableViewOptions<TData>({
	table,
	label = "Columns",
	className,
}: Props<TData>) {
	const columns = table
		.getAllLeafColumns()
		.filter((column) => column.getCanHide());
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				render={
					<Button variant="outline" size="sm" className={className}>
						<ColumnsIcon />
						{label}
					</Button>
				}
			/>
			<DropdownMenu.Content align="end" className="w-48">
				<DropdownMenu.Label>{label}</DropdownMenu.Label>
				<DropdownMenu.Separator />
				{columns.map((column) => (
					<DropdownMenu.CheckboxItem
						key={column.id}
						checked={column.getIsVisible()}
						onCheckedChange={(checked) => column.toggleVisibility(checked)}
					>
						{typeof column.columnDef.header === "string"
							? column.columnDef.header
							: column.id}
					</DropdownMenu.CheckboxItem>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
