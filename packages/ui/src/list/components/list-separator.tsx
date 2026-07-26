import type * as React from "react";

import { Item } from "#/item/components/item.tsx";

export function ListSeparator({
	className,
	...props
}: React.ComponentProps<typeof Item.Separator>) {
	return (
		<li role="presentation" aria-hidden="true" data-slot="list-separator">
			<Item.Separator className={className} {...props} />
		</li>
	);
}
