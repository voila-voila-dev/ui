import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

export function MenubarMenu({
	...props
}: React.ComponentProps<typeof DropdownMenu.Root>) {
	return <DropdownMenu.Root data-slot="menubar-menu" {...props} />;
}
