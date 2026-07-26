import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function ItemActions({ className, ...props }: Props) {
	return (
		<div
			data-slot="item-actions"
			className={cn("flex items-center gap-2", className)}
			{...props}
		/>
	);
}
