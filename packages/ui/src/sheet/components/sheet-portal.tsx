import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { usePortalContainer } from "#/portal-container/components/portal-container.tsx";

interface Props extends SheetPrimitive.Portal.Props {}

export function SheetPortal({ container, ...props }: Props) {
	const fallback = usePortalContainer();
	return (
		<SheetPrimitive.Portal
			data-slot="sheet-portal"
			container={container ?? fallback}
			{...props}
		/>
	);
}
