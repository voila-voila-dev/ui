import type * as React from "react";
import { Dialog } from "#/dialog/components/dialog.tsx";
import { Drawer } from "#/drawer/components/drawer.tsx";
import { useResponsiveDialogIsMobile } from "#/responsive-dialog/context/responsive-dialog-context.ts";

export function ResponsiveDialogDescription({
	className,
	...props
}: React.ComponentProps<typeof Drawer.Description>) {
	const isMobile = useResponsiveDialogIsMobile("ResponsiveDialog.Description");
	return isMobile ? (
		<Drawer.Description className={className} {...props} />
	) : (
		<Dialog.Description className={className} {...props} />
	);
}
