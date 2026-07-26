import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"span"> {}
export function InputGroupText({ className, ...props }: Props) {
	return (
		<span
			data-slot="input-group-text"
			className={cn(
				"flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	);
}
