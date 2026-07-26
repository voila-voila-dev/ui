import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

export function MenubarSubTrigger({
	className,
	...props
}: React.ComponentProps<typeof DropdownMenu.SubTrigger>) {
	return (
		<DropdownMenu.SubTrigger
			data-slot="menubar-sub-trigger"
			className={className}
			{...props}
		/>
	);
}
