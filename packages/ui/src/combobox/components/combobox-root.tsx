import { Combobox as ComboboxPrimitive } from "@base-ui/react";

// Base UI's combobox root renders no DOM element of its own, so it can't carry
// a `data-slot` the way the other kit roots do; we still wrap it in a named
// generic function for API consistency (and a discoverable doc anchor) while
// forwarding the value/multiple generics intact.
export function ComboboxRoot<
	Value,
	Multiple extends boolean | undefined = false,
>(props: ComboboxPrimitive.Root.Props<Value, Multiple>) {
	return <ComboboxPrimitive.Root {...props} />;
}
