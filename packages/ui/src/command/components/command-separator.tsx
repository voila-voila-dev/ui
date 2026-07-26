import { Command as CommandPrimitive } from "cmdk";
import type * as React from "react";
import { cn } from "#/lib/utils.ts";
import { menuSeparatorVariants } from "#/menu/components/menu-variants.ts";

export function CommandSeparator({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
	return (
		<CommandPrimitive.Separator
			data-slot="command-separator"
			className={cn(menuSeparatorVariants(), className)}
			{...props}
		/>
	);
}
