import type * as React from "react";
import { Shortcut } from "#/shortcut/components/shortcut.tsx";

export function DropdownMenuShortcut({
	...props
}: React.ComponentProps<typeof Shortcut>) {
	return <Shortcut data-slot="dropdown-menu-shortcut" {...props} />;
}
