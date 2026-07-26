import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn } from "#/lib/utils.ts";
import { menuSeparatorVariants } from "#/menu/components/menu-variants.ts";

export function ContextMenuSeparator({
	className,
	...props
}: ContextMenuPrimitive.Separator.Props) {
	return (
		<ContextMenuPrimitive.Separator
			data-slot="context-menu-separator"
			className={cn(menuSeparatorVariants(), className)}
			{...props}
		/>
	);
}
