import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

export function MenubarGroup({
	...props
}: React.ComponentProps<typeof DropdownMenu.Group>) {
	return <DropdownMenu.Group data-slot="menubar-group" {...props} />;
}
