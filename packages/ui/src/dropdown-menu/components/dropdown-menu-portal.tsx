import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { usePortalContainer } from "#/portal-container/components/portal-container.tsx";

interface Props extends MenuPrimitive.Portal.Props {}

export function DropdownMenuPortal({ container, ...props }: Props) {
	const fallback = usePortalContainer();
	return (
		<MenuPrimitive.Portal
			data-slot="dropdown-menu-portal"
			container={container ?? fallback}
			{...props}
		/>
	);
}
