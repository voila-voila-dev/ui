import type * as React from "react";

import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function StepperDescription({ className, ...props }: Props) {
	return (
		<div
			data-slot="stepper-description"
			className={cn("text-xs text-muted-foreground", className)}
			{...props}
		/>
	);
}
