import { Drawer } from "#/drawer/components/drawer.tsx";
import { useResponsiveSheetIsMobile } from "#/responsive-sheet/context/responsive-sheet-context.ts";
import { Sheet } from "#/sheet/components/sheet.tsx";

export function ResponsiveSheetFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	const isMobile = useResponsiveSheetIsMobile("ResponsiveSheet.Footer");
	return isMobile ? (
		<Drawer.Footer className={className} {...props} />
	) : (
		<Sheet.Footer className={className} {...props} />
	);
}
