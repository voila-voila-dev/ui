import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function BannerTitle({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="banner-title"
			className={cn(
				"flex-1 font-medium text-balance [&_a]:underline [&_a]:underline-offset-4",
				className,
			)}
			{...props}
		/>
	);
}
