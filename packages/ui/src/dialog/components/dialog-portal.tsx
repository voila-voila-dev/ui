import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { usePortalContainer } from "#/portal-container/components/portal-container.tsx";

interface Props extends DialogPrimitive.Portal.Props {}

export function DialogPortal({ container, ...props }: Props) {
	const fallback = usePortalContainer();
	return (
		<DialogPrimitive.Portal
			data-slot="dialog-portal"
			container={container ?? fallback}
			{...props}
		/>
	);
}
