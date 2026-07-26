import type * as React from "react";
import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"div">;

/**
 * Filters emplacement for the toolbar - groups selects, checkbox groups,
 * toggle filters... so every table lays them out the same way.
 */
export function DataTableFilters({ className, ...props }: Props) {
	return (
		<div
			role="group"
			data-slot="data-table-filters"
			className={cn("flex flex-wrap items-center gap-2", className)}
			{...props}
		/>
	);
}
