import type * as React from "react";

import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}
export function PopoverHeader({ className, ...props }: Props) {
	return (
		<div
			data-slot="popover-header"
			className={cn("flex flex-col gap-0.5", className)}
			{...props}
		/>
	);
}
