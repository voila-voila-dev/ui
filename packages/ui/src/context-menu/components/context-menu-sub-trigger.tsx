import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { CaretRightIcon } from "@phosphor-icons/react";
import { cn } from "#/lib/utils.ts";
import { menuSubTriggerVariants } from "#/menu/components/menu-variants.ts";

export function ContextMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.SubmenuTrigger
			data-slot="context-menu-sub-trigger"
			data-inset={inset}
			className={cn(menuSubTriggerVariants(), className)}
			{...props}
		>
			{children}
			<CaretRightIcon className="ml-auto" />
		</ContextMenuPrimitive.SubmenuTrigger>
	);
}
