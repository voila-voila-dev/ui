import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

type Props = DialogPrimitive.Portal.Props;
export function DialogPortal({ ...props }: Props) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
