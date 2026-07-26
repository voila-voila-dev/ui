import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}
export function SheetHeader({ className, ...props }: Props) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("flex flex-col gap-0.5 p-4", className)}
			{...props}
		/>
	);
}
