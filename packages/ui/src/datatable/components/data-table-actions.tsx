import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

/**
 * End-aligned slot of the toolbar for bulk/primary actions (export, create,
 * delete selection...).
 */
export function DataTableActions({ className, ...props }: Props) {
	return (
		<div
			data-slot="data-table-actions"
			className={cn("ms-auto flex items-center gap-2", className)}
			{...props}
		/>
	);
}
