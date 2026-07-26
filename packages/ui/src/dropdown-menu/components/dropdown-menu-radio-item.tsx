import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CircleIcon } from "@phosphor-icons/react";
import { cn } from "#/lib/utils.ts";
import {
	menuIndicatorVariants,
	menuItemVariants,
} from "#/menu/components/menu-variants.ts";

export function DropdownMenuRadioItem({
	className,
	children,
	inset,
	...props
}: MenuPrimitive.RadioItem.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			data-inset={inset}
			className={cn(menuItemVariants({ indicator: "end" }), className)}
			{...props}
		>
			<span
				className={menuIndicatorVariants()}
				data-slot="dropdown-menu-radio-item-indicator"
			>
				<MenuPrimitive.RadioItemIndicator>
					<CircleIcon weight="fill" className="size-2" />
				</MenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</MenuPrimitive.RadioItem>
	);
}
