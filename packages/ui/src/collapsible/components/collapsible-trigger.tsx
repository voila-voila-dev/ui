import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cn } from "#/lib/utils.ts";

export function CollapsibleTrigger({
	className,
	...props
}: CollapsiblePrimitive.Trigger.Props) {
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="collapsible-trigger"
			className={cn(className)}
			{...props}
		/>
	);
}
