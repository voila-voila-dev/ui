import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

export function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
	return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}
