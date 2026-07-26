import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "#/lib/utils.ts";

export function SelectGroup({
	className,
	...props
}: SelectPrimitive.Group.Props) {
	return (
		<SelectPrimitive.Group
			data-slot="select-group"
			className={cn("scroll-my-1", className)}
			{...props}
		/>
	);
}
