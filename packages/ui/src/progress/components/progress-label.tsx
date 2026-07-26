import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "#/lib/utils.ts";

export function ProgressLabel({
	className,
	...props
}: ProgressPrimitive.Label.Props) {
	return (
		<ProgressPrimitive.Label
			data-slot="progress-label"
			className={cn("text-sm font-medium", className)}
			{...props}
		/>
	);
}
