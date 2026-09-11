import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "#/lib/utils.ts";
import { menuContentVariants } from "#/menu/components/menu-variants.ts";
import { usePortalContainer } from "#/portal-container/components/portal-container.tsx";

interface Props
	extends MenuPrimitive.Popup.Props,
		Pick<
			MenuPrimitive.Positioner.Props,
			"align" | "alignOffset" | "side" | "sideOffset"
		> {}

export function DropdownMenuContent({
	align = "start",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 4,
	className,
	...props
}: Props) {
	const portalContainer = usePortalContainer();
	return (
		<MenuPrimitive.Portal container={portalContainer}>
			<MenuPrimitive.Positioner
				className="isolate z-50 outline-none"
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
			>
				<MenuPrimitive.Popup
					data-slot="dropdown-menu-content"
					className={cn(menuContentVariants(), className)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	);
}
