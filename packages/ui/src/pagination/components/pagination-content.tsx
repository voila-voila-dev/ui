import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"ul"> {}
export function PaginationContent({ className, ...props }: Props) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn("flex items-center gap-0.5", className)}
			{...props}
		/>
	);
}
