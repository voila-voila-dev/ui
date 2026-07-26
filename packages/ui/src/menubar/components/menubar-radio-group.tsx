import type * as React from "react";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

export function MenubarRadioGroup({
	...props
}: React.ComponentProps<typeof DropdownMenu.RadioGroup>) {
	return <DropdownMenu.RadioGroup data-slot="menubar-radio-group" {...props} />;
}
