import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function AlertAction({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-center group-has-[>svg]/alert:col-start-3",
				className,
			)}
			{...props}
		/>
	);
}
