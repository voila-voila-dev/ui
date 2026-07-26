import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function BannerAction({ className, ...props }: Props) {
	return (
		<div
			data-slot="banner-action"
			className={cn("flex shrink-0 items-center gap-2", className)}
			{...props}
		/>
	);
}
