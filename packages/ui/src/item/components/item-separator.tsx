import type * as React from "react";
import { cn } from "#/lib/utils.ts";
import { Separator } from "#/separator/components/separator.tsx";

export function ItemSeparator({
	className,
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="item-separator"
			orientation="horizontal"
			className={cn("my-2", className)}
			{...props}
		/>
	);
}
