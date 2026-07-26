import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "#/lib/utils.ts";

export function ProgressValue({
	className,
	...props
}: ProgressPrimitive.Value.Props) {
	return (
		<ProgressPrimitive.Value
			data-slot="progress-value"
			className={cn(
				"ml-auto text-sm text-muted-foreground tabular-nums",
				className,
			)}
			{...props}
		/>
	);
}
