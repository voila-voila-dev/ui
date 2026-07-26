import type * as React from "react";
import { cn, proseLinkClassName } from "#/lib/utils.ts";

export function AlertDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				"text-sm text-balance text-muted-foreground md:text-pretty [&_p:not(:last-child)]:mb-4",
				proseLinkClassName,
				className,
			)}
			{...props}
		/>
	);
}
