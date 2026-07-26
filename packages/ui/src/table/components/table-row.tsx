import type * as React from "react";

import { cn } from "#/lib/utils.ts";

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				"border-b transition-colors has-aria-expanded:bg-muted/50 data-selected:bg-muted [tbody_&]:hover:bg-muted/50",
				className,
			)}
			{...props}
		/>
	);
}
