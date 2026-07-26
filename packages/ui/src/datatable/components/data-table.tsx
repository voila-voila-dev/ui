import { DataTableActions } from "#/datatable/components/data-table-actions.tsx";
import { DataTableDensityToggle } from "#/datatable/components/data-table-density-toggle.tsx";
import { DataTableEmpty } from "#/datatable/components/data-table-empty.tsx";
import { DataTableExport } from "#/datatable/components/data-table-export.tsx";
import { DataTableFilters } from "#/datatable/components/data-table-filters.tsx";
import { DataTablePagination } from "#/datatable/components/data-table-pagination.tsx";
import { DataTableRoot } from "#/datatable/components/data-table-root.tsx";
import { DataTableSearch } from "#/datatable/components/data-table-search.tsx";
import { DataTableToolbar } from "#/datatable/components/data-table-toolbar.tsx";
import { DataTableViewOptions } from "#/datatable/components/data-table-view-options.tsx";

// Re-exported so consumers can type their `columns` without depending on
// @tanstack/react-table directly.
export type {
	ColumnDef,
	ColumnOrderState,
	ColumnPinningState,
	ColumnSizingState,
	ExpandedState,
	Row,
	RowSelectionState,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
export { dataTableSelectionColumn } from "#/datatable/components/data-table-selection-column.tsx";
export type { DataTableDensity } from "#/datatable/libs/density.ts";
export { dataTableToCsv } from "#/datatable/libs/to-csv.ts";

/**
 * The DataTable parts as one namespace.
 */
export const DataTable = {
	Root: DataTableRoot,
	Actions: DataTableActions,
	DensityToggle: DataTableDensityToggle,
	Empty: DataTableEmpty,
	Export: DataTableExport,
	Filters: DataTableFilters,
	Pagination: DataTablePagination,
	Search: DataTableSearch,
	Toolbar: DataTableToolbar,
	ViewOptions: DataTableViewOptions,
};
