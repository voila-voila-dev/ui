import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CaretRightIcon } from "@phosphor-icons/react";
import { cn } from "#/lib/utils.ts";
import { menuSubTriggerVariants } from "#/menu/components/menu-variants.ts";

export function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: MenuPrimitive.SubmenuTrigger.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={inset}
			className={cn(menuSubTriggerVariants(), className)}
			{...props}
		>
			{children}
			<CaretRightIcon className="ml-auto" />
		</MenuPrimitive.SubmenuTrigger>
	);
}
