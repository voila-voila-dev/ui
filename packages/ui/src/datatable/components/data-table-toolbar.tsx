import type * as React from "react";
import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"div">;

/**
 * Emplacement row above a `DataTable`: search at the start, filter controls
 * next to it, end-aligned actions via `DataTable.Actions`. Wraps on narrow
 * screens instead of overflowing.
 */
export function DataTableToolbar({ className, ...props }: Props) {
	return (
		<div
			data-slot="data-table-toolbar"
			className={cn("flex flex-wrap items-center gap-2", className)}
			{...props}
		/>
	);
}
