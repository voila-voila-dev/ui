import * as React from "react";
import { ChatMessageActionsSurfaceContext } from "#/chat/context/chat-message-actions-surface-context.ts";
import { ContextMenuItem } from "#/context-menu/components/context-menu-item.tsx";
import { cn } from "#/lib/utils.ts";
import { menuItemVariants } from "#/menu/components/menu-variants.ts";

interface Props extends React.ComponentProps<typeof ContextMenuItem> {}

/**
 * One entry of the message menu. A thin pass-through over the context-menu
 * item so a caller composes with `Chat.*` throughout and never has to know
 * which primitive the menu is built on — `variant="destructive"` still tints
 * the one action that cannot be undone. Inside the long-press surface there is
 * no menu, so the same entry renders as a plain button in the actions card.
 */
export function ChatMessageAction(props: Props) {
	const surface = React.useContext(ChatMessageActionsSurfaceContext);
	if (surface === null) {
		return <ContextMenuItem data-slot="chat-message-action" {...props} />;
	}
	const {
		className,
		inset,
		variant = "default",
		onClick,
		disabled,
		children,
	} = props;
	return (
		<button
			type="button"
			data-slot="chat-message-action"
			data-inset={inset || undefined}
			data-variant={variant}
			disabled={disabled === true}
			className={cn(
				menuItemVariants({ variant }),
				"w-full py-2 active:bg-accent",
				variant === "destructive" && "active:bg-destructive/10",
				className,
			)}
			onClick={(event) => {
				onClick?.(
					event as unknown as Parameters<NonNullable<typeof onClick>>[0],
				);
				surface.close();
			}}
		>
			{children}
		</button>
	);
}
