import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"ul"> {}
export function SidebarMenu({ className, ...props }: Props) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			// gap-1: without it two adjacent items with a background — the active one
			// and a hovered one — merge into a single block.
			className={cn("flex w-full min-w-0 flex-col gap-1", className)}
			{...props}
		/>
	);
}
