import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

export function MenubarItem({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenu.Item>) {
	return (
		<DropdownMenu.Item
			data-slot="menubar-item"
			className={className}
			{...props}
		/>
	);
}
