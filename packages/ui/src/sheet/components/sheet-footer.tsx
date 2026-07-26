import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function SheetFooter({ className, ...props }: Props) {
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
