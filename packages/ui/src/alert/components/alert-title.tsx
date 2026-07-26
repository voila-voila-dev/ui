import type * as React from "react";
import { cn, proseLinkClassName } from "#/lib/utils.ts";

export function AlertTitle({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				"font-medium group-has-[>svg]/alert:col-start-2",
				proseLinkClassName,
				className,
			)}
			{...props}
		/>
	);
}
