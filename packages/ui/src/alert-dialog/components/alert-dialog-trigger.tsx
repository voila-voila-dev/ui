import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

export function AlertDialogTrigger({
	...props
}: AlertDialogPrimitive.Trigger.Props) {
	return (
		<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
	);
}
