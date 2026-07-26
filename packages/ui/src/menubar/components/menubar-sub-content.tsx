import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";
import { cn } from "#/lib/utils.ts";

export function MenubarSubContent({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenu.SubContent>) {
	return (
		<DropdownMenu.SubContent
			data-slot="menubar-sub-content"
			className={cn("min-w-32", className)}
			{...props}
		/>
	);
}
