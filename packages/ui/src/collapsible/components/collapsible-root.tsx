import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cn } from "#/lib/utils.ts";

export function CollapsibleRoot({
	className,
	...props
}: CollapsiblePrimitive.Root.Props) {
	return (
		<CollapsiblePrimitive.Root
			data-slot="collapsible"
			className={cn(className)}
			{...props}
		/>
	);
}
