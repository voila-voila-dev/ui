import type * as React from "react";

import { cn } from "#/lib/utils.ts";

export function StepperTitle({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="stepper-title"
			className={cn(
				"text-sm leading-tight font-medium whitespace-nowrap group-data-[state=inactive]/stepper-item:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}
