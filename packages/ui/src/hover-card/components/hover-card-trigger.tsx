import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

/**
 * Opens the card after `delay` (600ms Base UI default) and closes it after
 * `closeDelay` (300ms default) — both are tuned here, on the trigger.
 */
export function HoverCardTrigger({
	...props
}: PreviewCardPrimitive.Trigger.Props) {
	return (
		<PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
	);
}
