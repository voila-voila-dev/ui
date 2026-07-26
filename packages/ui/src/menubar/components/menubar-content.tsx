import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";
import { cn } from "#/lib/utils.ts";

export function MenubarContent({
	className,
	align = "start",
	alignOffset = -4,
	sideOffset = 8,
	...props
}: React.ComponentProps<typeof DropdownMenu.Content>) {
	return (
		<DropdownMenu.Content
			data-slot="menubar-content"
			align={align}
			alignOffset={alignOffset}
			sideOffset={sideOffset}
			className={cn("min-w-36", className)}
			{...props}
		/>
	);
}
