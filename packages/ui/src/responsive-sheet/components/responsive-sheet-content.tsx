import type * as React from "react";
import { Drawer } from "#/drawer/components/drawer.tsx";
import { useResponsiveSheetIsMobile } from "#/responsive-sheet/context/responsive-sheet-context.ts";
import { Sheet, type SheetContentSize } from "#/sheet/components/sheet.tsx";

export function ResponsiveSheetContent({
	className,
	children,
	size = "default",
	showCloseButton = true,
	closeButtonLabel = "Close",
}: {
	className?: string;
	children?: React.ReactNode;
	/** Desktop panel width — the mobile drawer is always full-width. */
	size?: SheetContentSize;
	showCloseButton?: boolean;
	closeButtonLabel?: string;
}) {
	const isMobile = useResponsiveSheetIsMobile("ResponsiveSheet.Content");
	if (isMobile) {
		return (
			<Drawer.Content
				className={className}
				showCloseButton={showCloseButton}
				closeButtonLabel={closeButtonLabel}
			>
				{children}
			</Drawer.Content>
		);
	}
	return (
		<Sheet.Content
			className={className}
			size={size}
			showCloseButton={showCloseButton}
			closeButtonLabel={closeButtonLabel}
		>
			{children}
		</Sheet.Content>
	);
}
