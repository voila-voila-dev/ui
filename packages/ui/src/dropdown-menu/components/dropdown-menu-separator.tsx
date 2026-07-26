import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "#/lib/utils.ts";
import { menuSeparatorVariants } from "#/menu/components/menu-variants.ts";

export function DropdownMenuSeparator({
	className,
	...props
}: MenuPrimitive.Separator.Props) {
	return (
		<MenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn(menuSeparatorVariants(), className)}
			{...props}
		/>
	);
}
