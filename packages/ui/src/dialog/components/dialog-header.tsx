import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function DialogHeader({ className, ...props }: Props) {
	return (
		<div
			data-slot="dialog-header"
			// `pr-8` reserves room so the title never runs under the X button.
			className={cn("flex flex-col gap-2 pr-8", className)}
			{...props}
		/>
	);
}
