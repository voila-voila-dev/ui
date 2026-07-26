import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "#/lib/utils.ts";

export function SliderValue({
	className,
	...props
}: SliderPrimitive.Value.Props) {
	return (
		<SliderPrimitive.Value
			data-slot="slider-value"
			className={cn("text-sm text-muted-foreground tabular-nums", className)}
			{...props}
		/>
	);
}
