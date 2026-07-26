import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { TooltipProvider } from "#/tooltip/components/tooltip-provider.tsx";

export function TooltipRoot({
	delay,
	...props
}: TooltipPrimitive.Root.Props &
	Pick<TooltipPrimitive.Provider.Props, "delay">) {
	return (
		<TooltipProvider delay={delay}>
			<TooltipPrimitive.Root data-slot="tooltip" {...props} />
		</TooltipProvider>
	);
}
