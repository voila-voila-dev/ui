import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { usePortalContainer } from "#/portal-container/components/portal-container.tsx";

interface Props extends ContextMenuPrimitive.Portal.Props {}

export function ContextMenuPortal({ container, ...props }: Props) {
	const fallback = usePortalContainer();
	return (
		<ContextMenuPrimitive.Portal
			data-slot="context-menu-portal"
			container={container ?? fallback}
			{...props}
		/>
	);
}
