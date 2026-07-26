import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";

export function ContextMenuRoot({ ...props }: ContextMenuPrimitive.Root.Props) {
	return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}
