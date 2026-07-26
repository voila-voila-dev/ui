import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function DrawerHeader({ className, ...props }: Props) {
	return (
		<div
			data-slot="drawer-header"
			className={cn(
				// `pr-8` on side drawers reserves room so the title never runs under
				// the X button; bottom/top drawers center on mobile, left-align on md+.
				"flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=left]/drawer-content:pr-8 group-data-[vaul-drawer-direction=right]/drawer-content:pr-8 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-left md:group-data-[vaul-drawer-direction=top]/drawer-content:text-left",
				className,
			)}
			{...props}
		/>
	);
}
