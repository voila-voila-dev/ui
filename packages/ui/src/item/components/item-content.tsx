import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function ItemContent({ className, ...props }: Props) {
	return (
		<div
			data-slot="item-content"
			className={cn(
				"flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
				className,
			)}
			{...props}
		/>
	);
}
