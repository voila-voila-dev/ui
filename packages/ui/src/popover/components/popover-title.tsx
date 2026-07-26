import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "#/lib/utils.ts";

export function PopoverTitle({
	className,
	...props
}: PopoverPrimitive.Title.Props) {
	return (
		<PopoverPrimitive.Title
			data-slot="popover-title"
			className={cn("font-medium", className)}
			{...props}
		/>
	);
}
