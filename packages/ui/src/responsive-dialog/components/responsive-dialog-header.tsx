import type * as React from "react";
import { Dialog } from "#/dialog/components/dialog.tsx";
import { Drawer } from "#/drawer/components/drawer.tsx";
import { useResponsiveDialogIsMobile } from "#/responsive-dialog/context/responsive-dialog-context.ts";

export function ResponsiveDialogHeader(props: React.ComponentProps<"div">) {
	const isMobile = useResponsiveDialogIsMobile("ResponsiveDialog.Header");
	return isMobile ? <Drawer.Header {...props} /> : <Dialog.Header {...props} />;
}
