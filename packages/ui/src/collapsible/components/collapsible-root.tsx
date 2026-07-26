import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cn } from "#/lib/utils.ts";

interface Props extends CollapsiblePrimitive.Root.Props {}

export function CollapsibleRoot({ className, ...props }: Props) {
	return (
		<CollapsiblePrimitive.Root
			data-slot="collapsible"
			className={cn(className)}
			{...props}
		/>
	);
}
