import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { Button } from "#/button/components/button.tsx";
import type { ButtonVariants } from "#/button/components/button-variants.ts";

interface Props
	extends Omit<AlertDialogPrimitive.Close.Props, "variant" | "size">,
		Pick<ButtonVariants, "variant" | "size"> {}

export function AlertDialogAction({
	className,
	variant = "default",
	size = "default",
	...props
}: Props) {
	return (
		<AlertDialogPrimitive.Close
			data-slot="alert-dialog-action"
			className={className}
			render={<Button variant={variant} size={size} />}
			{...props}
		/>
	);
}
