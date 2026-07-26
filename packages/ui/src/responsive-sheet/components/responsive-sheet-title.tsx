import type * as React from "react";
import { Drawer } from "#/drawer/components/drawer.tsx";
import { useResponsiveSheetIsMobile } from "#/responsive-sheet/context/responsive-sheet-context.ts";
import { Sheet } from "#/sheet/components/sheet.tsx";

export function ResponsiveSheetTitle({
	className,
	...props
}: React.ComponentProps<typeof Drawer.Title>) {
	const isMobile = useResponsiveSheetIsMobile("ResponsiveSheet.Title");
	return isMobile ? (
		<Drawer.Title className={className} {...props} />
	) : (
		<Sheet.Title className={className} {...props} />
	);
}
