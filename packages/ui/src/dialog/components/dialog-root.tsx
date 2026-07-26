import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

type Props = DialogPrimitive.Root.Props;
export function DialogRoot({ ...props }: Props) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
