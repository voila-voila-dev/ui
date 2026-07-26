import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function BannerTitle({ className, ...props }: Props) {
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
