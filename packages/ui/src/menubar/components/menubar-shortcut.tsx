import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

export function MenubarShortcut({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenu.Shortcut>) {
	return (
		<DropdownMenu.Shortcut
			data-slot="menubar-shortcut"
			className={className}
			{...props}
		/>
	);
}
