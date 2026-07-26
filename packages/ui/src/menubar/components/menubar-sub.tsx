import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

export function MenubarSub({
	...props
}: React.ComponentProps<typeof DropdownMenu.Sub>) {
	return <DropdownMenu.Sub data-slot="menubar-sub" {...props} />;
}
