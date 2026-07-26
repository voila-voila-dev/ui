import type * as React from "react";

import { cn } from "#/lib/utils.ts";

export function PopoverHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="popover-header"
			className={cn("flex flex-col gap-0.5", className)}
			{...props}
		/>
	);
}
