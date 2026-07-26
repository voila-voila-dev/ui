import { Drawer } from "#/drawer/components/drawer.tsx";
import { useResponsiveSheetIsMobile } from "#/responsive-sheet/context/responsive-sheet-context.ts";
import { Sheet } from "#/sheet/components/sheet.tsx";

interface Props extends React.ComponentProps<"div"> {}
export function ResponsiveSheetFooter({ className, ...props }: Props) {
	const isMobile = useResponsiveSheetIsMobile("ResponsiveSheet.Footer");
	return isMobile ? (
		<Drawer.Footer className={className} {...props} />
	) : (
		<Sheet.Footer className={className} {...props} />
	);
}
