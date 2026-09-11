import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { usePortalContainerNode } from "#/portal-container/components/portal-container.tsx";

interface Props extends React.ComponentProps<typeof DrawerPrimitive.Portal> {}

export function DrawerPortal({ container, ...props }: Props) {
	// vaul portals through Radix, which takes an element, not a ref or a shadow root.
	const node = usePortalContainerNode();
	const fallback = node instanceof HTMLElement ? node : undefined;
	return (
		<DrawerPrimitive.Portal
			data-slot="drawer-portal"
			container={container ?? fallback}
			{...props}
		/>
	);
}
