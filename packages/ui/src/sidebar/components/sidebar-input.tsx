import type * as React from "react";
import { Input } from "#/input/components/input.tsx";
import { cn } from "#/lib/utils.ts";

export function SidebarInput({
	className,
	...props
}: React.ComponentProps<typeof Input>) {
	return (
		<Input
			data-slot="sidebar-input"
			data-sidebar="input"
			className={cn("h-8 w-full bg-background shadow-none", className)}
			{...props}
		/>
	);
}
