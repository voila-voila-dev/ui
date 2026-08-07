import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import * as React from "react";
import { ChatQuickReactionRow } from "#/chat/components/chat-quick-reaction-row.tsx";
import { ChatMessageActionsSurfaceContext } from "#/chat/context/chat-message-actions-surface-context.ts";
import { cn } from "#/lib/utils.ts";

/** Room the emoji row needs above the bubble before it falls back below. */
const REACTION_ROW_SPACE = 64;
/** Room the actions card wants below the bubble before it moves above. */
const ACTIONS_SPACE = 220;
/** Breathing room between the bubble and the floating blocks. */
const GAP = 10;
/** Minimum inset from the viewport edges. */
const EDGE = 12;

export interface ChatPressedMessage {
	/** Where the pressed bubble sits, in viewport coordinates. */
	rect: {
		top: number;
		left: number;
		right: number;
		bottom: number;
		width: number;
	};
	/** Whether the message sits on the reader's own (end) side of the thread. */
	end: boolean;
}

interface Props {
	pressed: ChatPressedMessage | null;
	onClose: () => void;
	emojis: ReadonlyArray<string>;
	activeEmojis: ReadonlySet<string>;
	onReact?: (emoji: string) => void;
	reactionsLabel?: string;
	/** Accessible name of the surface itself. */
	label?: string;
	actions?: React.ReactNode;
	/** The bubble to lift above the veil — the same children the menu wraps. */
	children: React.ReactNode;
}

/**
 * The long-press surface of a touch screen: the thread dims and blurs, the
 * pressed bubble stays put above the veil, the one-tap emoji row lands next
 * to it and the message actions stack on whichever side has room.
 */
export function ChatMessagePressSurface({
	pressed,
	onClose,
	emojis,
	activeEmojis,
	onReact,
	reactionsLabel,
	label,
	actions,
	children,
}: Props) {
	// The last press is kept so the layout survives while the exit animation
	// plays after `pressed` goes back to null.
	const lastPressedRef = React.useRef<ChatPressedMessage | null>(null);
	if (pressed !== null) {
		lastPressedRef.current = pressed;
	}
	const shown = pressed ?? lastPressedRef.current;
	if (shown === null) {
		return null;
	}

	const { rect, end } = shown;
	const viewportHeight = window.innerHeight;
	const reactionsAbove = rect.top >= REACTION_ROW_SPACE;
	const spaceBelow = viewportHeight - rect.bottom;
	const actionsBelow =
		!reactionsAbove || spaceBelow >= ACTIONS_SPACE || spaceBelow >= rect.top;

	const horizontal: React.CSSProperties = end
		? { right: Math.max(EDGE, window.innerWidth - rect.right) }
		: { left: Math.max(EDGE, rect.left) };
	const slot = (topSide: boolean): React.CSSProperties =>
		topSide
			? { ...horizontal, bottom: viewportHeight - rect.top + GAP }
			: { ...horizontal, top: rect.bottom + GAP };

	const reactionRow =
		onReact !== undefined && emojis.length > 0 ? (
			<ChatQuickReactionRow
				emojis={emojis}
				activeEmojis={activeEmojis}
				label={reactionsLabel}
				stagger
				onReact={(emoji) => {
					onReact(emoji);
					onClose();
				}}
				className="w-fit rounded-full bg-popover p-1 shadow-lg ring-1 ring-foreground/10"
			/>
		) : null;

	const actionsCard =
		actions === undefined ? null : (
			<div
				data-slot="chat-message-actions"
				className="min-w-52 overflow-y-auto rounded-xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10"
				style={{
					maxHeight: Math.max(
						120,
						(actionsBelow ? spaceBelow : rect.top) - REACTION_ROW_SPACE - GAP,
					),
				}}
			>
				<ChatMessageActionsSurfaceContext.Provider value={{ close: onClose }}>
					{actions}
				</ChatMessageActionsSurfaceContext.Provider>
			</div>
		);

	return (
		<DialogPrimitive.Root
			open={pressed !== null}
			onOpenChange={(next) => {
				if (!next) {
					onClose();
				}
			}}
		>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Backdrop
					data-slot="chat-message-press-surface-backdrop"
					className={cn(
						"fixed inset-0 z-50 bg-black/40 backdrop-blur-md",
						"transition-[backdrop-filter,background-color] duration-200 starting:bg-transparent starting:backdrop-blur-none",
						"data-closed:fade-out-0 data-closed:animate-out motion-reduce:transition-none motion-reduce:data-closed:animate-none",
					)}
				/>
				<DialogPrimitive.Popup
					data-slot="chat-message-press-surface"
					aria-label={label}
					className={cn(
						"fixed inset-0 z-50 outline-hidden",
						"data-open:fade-in-0 data-closed:fade-out-0 data-open:animate-in data-closed:animate-out duration-200 motion-reduce:animate-none",
					)}
					onClick={(event) => {
						if (event.target === event.currentTarget) {
							onClose();
						}
					}}
				>
					{/* The pressed bubble, lifted above the veil at its own position.
					    A visual copy only: the live one stays in the thread under the
					    blur, so nothing moves when the surface closes. */}
					<div
						aria-hidden
						className={cn(
							"pointer-events-none fixed select-none drop-shadow-xl",
							"zoom-in-95 fade-in-50 animate-in duration-200 motion-reduce:animate-none",
							"[&_[data-slot=chat-bubble]]:w-full [&_[data-slot=chat-bubble]]:max-w-full",
						)}
						style={{ top: rect.top, left: rect.left, width: rect.width }}
					>
						{children}
					</div>
					<div
						className={cn(
							"absolute flex flex-col gap-2.5",
							end ? "items-end" : "items-start",
						)}
						style={slot(reactionsAbove)}
					>
						{/* Whichever block sits against the bubble goes last above it,
						    first below it, so the emoji row always hugs the message. */}
						{reactionsAbove && !actionsBelow && actionsCard}
						{reactionRow}
						{!reactionsAbove && actionsBelow && actionsCard}
					</div>
					{reactionsAbove && actionsBelow && actionsCard !== null && (
						<div
							className={cn(
								"absolute flex flex-col",
								end ? "items-end" : "items-start",
							)}
							style={slot(false)}
						>
							{actionsCard}
						</div>
					)}
				</DialogPrimitive.Popup>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}
