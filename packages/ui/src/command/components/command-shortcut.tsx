import type * as React from "react";
import { Shortcut } from "#/shortcut/components/shortcut.tsx";

export function CommandShortcut({
	...props
}: React.ComponentProps<typeof Shortcut>) {
	return <Shortcut data-slot="command-shortcut" {...props} />;
}
