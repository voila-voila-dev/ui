import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "#/lib/utils.ts";

export function DrawerTitle({
	className,
	...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
	return (
		<DrawerPrimitive.Title
			data-slot="drawer-title"
			className={cn("text-base font-medium text-foreground", className)}
			{...props}
		/>
	);
}
