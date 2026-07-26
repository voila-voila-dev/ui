import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function ItemTitle({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="item-title"
			className={cn(
				"line-clamp-1 flex w-fit items-center gap-2 text-sm leading-snug font-medium underline-offset-4",
				className,
			)}
			{...props}
		/>
	);
}
