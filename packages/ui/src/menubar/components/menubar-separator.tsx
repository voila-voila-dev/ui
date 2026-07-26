import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";
import { cn } from "#/lib/utils.ts";

export function MenubarSeparator({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenu.Separator>) {
	return (
		<DropdownMenu.Separator
			data-slot="menubar-separator"
			className={cn("-mx-1 my-1 h-px bg-border", className)}
			{...props}
		/>
	);
}
