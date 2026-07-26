import type * as React from "react";
import {
	type BadgeVariants,
	badgeVariants,
} from "#/badge/components/badge-variants.ts";
import { cn } from "#/lib/utils.ts";

/**
 * Dismissible tag built on the Badge recipe: same `variant`/`color`/`size`
 * axes, plus a `ChipRemove` button for removable selections (skills catalog,
 * active filters). For a static label, use `Badge` instead.
 */
export function ChipRoot({
	className,
	variant = "secondary",
	color,
	size = "default",
	...props
}: React.ComponentProps<"span"> & BadgeVariants) {
	return (
		<span
			data-slot="chip"
			data-variant={variant}
			data-color={color}
			data-size={size}
			className={cn(
				badgeVariants({ variant, color, size }),
				"has-data-[slot=chip-remove]:pr-1",
				size === "sm" && "has-data-[slot=chip-remove]:pr-0.5",
				className,
			)}
			{...props}
		/>
	);
}
