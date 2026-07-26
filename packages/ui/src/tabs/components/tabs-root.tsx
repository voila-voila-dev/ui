import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "#/lib/utils.ts";

export function TabsRoot({ className, ...props }: TabsPrimitive.Root.Props) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn(
				"group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}
