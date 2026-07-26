import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function SheetFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn(
				// Extra bottom padding keeps actions above the iOS home indicator.
				"mt-auto flex flex-col gap-2 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]",
				className,
			)}
			{...props}
		/>
	);
}
