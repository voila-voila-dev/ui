import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

export function MenubarCheckboxItem({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenu.CheckboxItem>) {
	return (
		<DropdownMenu.CheckboxItem
			data-slot="menubar-checkbox-item"
			className={className}
			{...props}
		/>
	);
}
