import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function AvatarGroupCount({
	className,
	size = "default",
	...props
}: React.ComponentProps<"div"> & {
	size?: "default" | "sm" | "lg";
}) {
	return (
		<div
			data-slot="avatar-group-count"
			data-size={size}
			className={cn(
				"relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background data-[size=lg]:size-10 data-[size=sm]:size-6 data-[size=lg]:text-base data-[size=sm]:text-xs [&>svg]:size-4 data-[size=lg]:[&>svg]:size-5 data-[size=sm]:[&>svg]:size-3",
				className,
			)}
			{...props}
		/>
	);
}
