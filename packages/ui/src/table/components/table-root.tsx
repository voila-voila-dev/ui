import type * as React from "react";

import { cn } from "#/lib/utils.ts";

export function TableRoot({
	className,
	containerClassName,
	...props
}: React.ComponentProps<"table"> & { containerClassName?: string }) {
	return (
		<div
			data-slot="table-container"
			className={cn("relative w-full overflow-x-auto", containerClassName)}
		>
			<table
				data-slot="table"
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	);
}
