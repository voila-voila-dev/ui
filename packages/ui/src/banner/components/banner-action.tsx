import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function BannerAction({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="banner-action"
			className={cn("flex shrink-0 items-center gap-2", className)}
			{...props}
		/>
	);
}
