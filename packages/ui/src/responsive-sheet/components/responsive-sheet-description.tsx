import type * as React from "react";
import { Drawer } from "#/drawer/components/drawer.tsx";
import { useResponsiveSheetIsMobile } from "#/responsive-sheet/context/responsive-sheet-context.ts";
import { Sheet } from "#/sheet/components/sheet.tsx";

export function ResponsiveSheetDescription({
	className,
	...props
}: React.ComponentProps<typeof Drawer.Description>) {
	const isMobile = useResponsiveSheetIsMobile("ResponsiveSheet.Description");
	return isMobile ? (
		<Drawer.Description className={className} {...props} />
	) : (
		<Sheet.Description className={className} {...props} />
	);
}
