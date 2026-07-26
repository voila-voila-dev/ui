import type * as React from "react";

import { cn } from "#/lib/utils.ts";

export function StepperDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="stepper-description"
			className={cn("text-xs text-muted-foreground", className)}
			{...props}
		/>
	);
}
