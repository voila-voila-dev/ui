import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn, proseLinkClassName } from "#/lib/utils.ts";

export function AccordionContent({
	className,
	children,
	...props
}: AccordionPrimitive.Panel.Props) {
	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-content"
			className={cn(
				"h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none",
				className,
			)}
			{...props}
		>
			<div
				className={cn("pb-2.5 [&_p:not(:last-child)]:mb-4", proseLinkClassName)}
			>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	);
}
