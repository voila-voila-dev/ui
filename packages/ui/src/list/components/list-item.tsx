import type * as React from "react";
import { Item } from "#/item/components/item.tsx";

export function ListItem(
	props: Omit<React.ComponentProps<typeof Item.Root>, "render">,
) {
	return <Item.Root data-slot="list-item" render={<li />} {...props} />;
}
