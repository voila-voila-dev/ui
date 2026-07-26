import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cn } from "#/lib/utils.ts";

interface Props extends CollapsiblePrimitive.Trigger.Props {}
export function CollapsibleTrigger({ className, ...props }: Props) {
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="collapsible-trigger"
			className={cn(className)}
			{...props}
		/>
	);
}
