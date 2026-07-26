import { Combobox as ComboboxPrimitive } from "@base-ui/react";

export function ComboboxGroup({ ...props }: ComboboxPrimitive.Group.Props) {
	return <ComboboxPrimitive.Group data-slot="combobox-group" {...props} />;
}
