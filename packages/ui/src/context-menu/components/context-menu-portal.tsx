import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";

export function ContextMenuPortal({
	...props
}: ContextMenuPrimitive.Portal.Props) {
	return (
		<ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
	);
}
