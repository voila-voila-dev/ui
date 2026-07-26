import { Combobox as ComboboxPrimitive } from "@base-ui/react";

export function ComboboxRow({ ...props }: ComboboxPrimitive.Row.Props) {
	return <ComboboxPrimitive.Row data-slot="combobox-row" {...props} />;
}
