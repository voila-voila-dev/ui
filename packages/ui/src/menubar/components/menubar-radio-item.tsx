import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

export function MenubarRadioItem({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenu.RadioItem>) {
	return (
		<DropdownMenu.RadioItem
			data-slot="menubar-radio-item"
			className={className}
			{...props}
		/>
	);
}
