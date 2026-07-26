import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

/**
 * Rich hover preview (Base UI PreviewCard) for link/mention triggers — an
 * avatar, a bio, a few stats. For a plain text hint on any control, use
 * Tooltip instead: a hover card is for content worth lingering on, so it opens
 * slower and stays open while the pointer is over the card itself.
 */
export function HoverCardRoot({ ...props }: PreviewCardPrimitive.Root.Props) {
	return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />;
}
