import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "#/lib/utils.ts";
import { menuLabelVariants } from "#/menu/components/menu-variants.ts";

export function ComboboxLabel({
	className,
	...props
}: ComboboxPrimitive.GroupLabel.Props) {
	return (
		<ComboboxPrimitive.GroupLabel
			data-slot="combobox-label"
			className={cn(menuLabelVariants(), className)}
			{...props}
		/>
	);
}
