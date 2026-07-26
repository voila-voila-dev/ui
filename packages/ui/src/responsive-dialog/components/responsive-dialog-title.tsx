import type * as React from "react";
import { Dialog } from "#/dialog/components/dialog.tsx";
import { Drawer } from "#/drawer/components/drawer.tsx";
import { useResponsiveDialogIsMobile } from "#/responsive-dialog/context/responsive-dialog-context.ts";

export function ResponsiveDialogTitle({
	className,
	...props
}: React.ComponentProps<typeof Drawer.Title>) {
	const isMobile = useResponsiveDialogIsMobile("ResponsiveDialog.Title");
	return isMobile ? (
		<Drawer.Title className={className} {...props} />
	) : (
		<Dialog.Title className={className} {...props} />
	);
}
