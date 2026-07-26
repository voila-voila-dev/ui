import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

export function AlertDialogRoot({ ...props }: AlertDialogPrimitive.Root.Props) {
	return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}
