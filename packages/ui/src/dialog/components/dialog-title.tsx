import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "#/lib/utils.ts";

type Props = DialogPrimitive.Title.Props;
export function DialogTitle({ className, ...props }: Props) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn(
				"text-base leading-none font-medium text-foreground",
				className,
			)}
			{...props}
		/>
	);
}
