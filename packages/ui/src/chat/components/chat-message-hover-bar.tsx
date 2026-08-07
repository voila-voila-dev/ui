import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { DotsThreeIcon } from "@phosphor-icons/react";
import type * as React from "react";
import { ChatQuickReactionRow } from "#/chat/components/chat-quick-reaction-row.tsx";
import { cn } from "#/lib/utils.ts";

interface Props {
	open: boolean;
	/** Only ever called with `false` — closing is the popover's business. */
	onClose: () => void;
	/** The bubble the bar floats above. */
	anchor: () => Element | null;
	/** The trigger wrapper the bar portals into, keeping it next in tab order. */
	container: React.RefObject<HTMLDivElement | null>;
	/** Same side as the bubble, so the bar overflows toward the thread. */
	align: "start" | "end";
	emojis: ReadonlyArray<string>;
	activeEmojis: ReadonlySet<string>;
	onReact?: (emoji: string) => void;
	reactionsLabel?: string;
	/** Accessible name of the "…" button opening the full menu. */
	menuLabel?: string;
	/** Opens the full menu anchored to the "…" button. */
	onOpenMenu: (anchor: DOMRect) => void;
}

/**
 * The floating bar a fine pointer summons by hovering a bubble: the one-tap
 * emoji row plus a "…" button opening the full menu. Portaled into the trigger
 * itself so it sits right after the bubble in the DOM and a keyboard reaches
 * it with Tab; the positioner still flips and shifts to stay in the viewport.
 */
export function ChatMessageHoverBar({
	open,
	onClose,
	anchor,
	container,
	align,
	emojis,
	activeEmojis,
	onReact,
	reactionsLabel,
	menuLabel,
	onOpenMenu,
}: Props) {
	const hasReactions = onReact !== undefined && emojis.length > 0;
	const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		onOpenMenu(event.currentTarget.getBoundingClientRect());
	};
	return (
		<PopoverPrimitive.Root
			open={open}
			onOpenChange={(next) => {
				if (!next) {
					onClose();
				}
			}}
		>
			<PopoverPrimitive.Portal container={container}>
				<PopoverPrimitive.Positioner
					anchor={anchor}
					side="top"
					align={align}
					sideOffset={6}
					collisionPadding={8}
					className="z-40"
				>
					<PopoverPrimitive.Popup
						data-slot="chat-message-hover-bar"
						initialFocus={false}
						finalFocus={false}
						className={cn(
							"flex items-center gap-0.5 rounded-full bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10",
							"data-open:fade-in-0 data-open:slide-in-from-bottom-1 data-closed:fade-out-0 data-open:animate-in data-closed:animate-out duration-150 motion-reduce:animate-none",
						)}
					>
						{hasReactions && (
							<ChatQuickReactionRow
								emojis={emojis}
								activeEmojis={activeEmojis}
								label={reactionsLabel}
								onReact={(emoji) => {
									onReact(emoji);
									onClose();
								}}
							/>
						)}
						{hasReactions && <div aria-hidden className="h-5 w-px bg-border" />}
						<button
							type="button"
							data-slot="chat-message-hover-bar-menu"
							aria-label={menuLabel}
							onClick={openMenu}
							className={cn(
								"flex size-8 shrink-0 items-center justify-center rounded-full outline-none transition-colors",
								"hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring/50",
							)}
						>
							<DotsThreeIcon weight="bold" className="size-5" />
						</button>
					</PopoverPrimitive.Popup>
				</PopoverPrimitive.Positioner>
			</PopoverPrimitive.Portal>
		</PopoverPrimitive.Root>
	);
}
