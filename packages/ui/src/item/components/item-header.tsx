import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}
export function ItemHeader({ className, ...props }: Props) {
	return (
		<div
			data-slot="item-header"
			className={cn(
				"flex basis-full items-center justify-between gap-2",
				className,
			)}
			{...props}
		/>
	);
}
