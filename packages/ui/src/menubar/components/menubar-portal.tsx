import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

export function MenubarPortal({
	...props
}: React.ComponentProps<typeof DropdownMenu.Portal>) {
	return <DropdownMenu.Portal data-slot="menubar-portal" {...props} />;
}
