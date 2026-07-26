import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { CircleIcon } from "@phosphor-icons/react";
import { cn } from "#/lib/utils.ts";
import {
	menuIndicatorVariants,
	menuItemVariants,
} from "#/menu/components/menu-variants.ts";

export function ContextMenuRadioItem({
	className,
	children,
	inset,
	...props
}: ContextMenuPrimitive.RadioItem.Props & {
	inset?: boolean;
}) {
	return (
		<ContextMenuPrimitive.RadioItem
			data-slot="context-menu-radio-item"
			data-inset={inset}
			className={cn(menuItemVariants({ indicator: "end" }), className)}
			{...props}
		>
			<span className={menuIndicatorVariants()}>
				<ContextMenuPrimitive.RadioItemIndicator>
					<CircleIcon weight="fill" className="size-2" />
				</ContextMenuPrimitive.RadioItemIndicator>
			</span>
			{children}
		</ContextMenuPrimitive.RadioItem>
	);
}
