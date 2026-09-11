import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { usePortalContainer } from "#/portal-container/components/portal-container.tsx";

interface Props extends AlertDialogPrimitive.Portal.Props {}

export function AlertDialogPortal({ container, ...props }: Props) {
	const fallback = usePortalContainer();
	return (
		<AlertDialogPrimitive.Portal
			data-slot="alert-dialog-portal"
			container={container ?? fallback}
			{...props}
		/>
	);
}
