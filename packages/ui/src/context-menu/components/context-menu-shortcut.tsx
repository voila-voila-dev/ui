import type * as React from "react";
import { Shortcut } from "#/shortcut/components/shortcut.tsx";

export function ContextMenuShortcut({
	...props
}: React.ComponentProps<typeof Shortcut>) {
	return <Shortcut data-slot="context-menu-shortcut" {...props} />;
}
