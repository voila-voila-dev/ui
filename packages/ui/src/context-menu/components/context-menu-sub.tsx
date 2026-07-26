import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";

export function ContextMenuSub({
	...props
}: ContextMenuPrimitive.SubmenuRoot.Props) {
	return (
		<ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
	);
}
