import type * as React from "react";
import {
	type ChatMessageVariants,
	chatMessageVariants,
} from "#/chat/components/chat-message-variants.ts";
import { cn } from "#/lib/utils.ts";

export function ChatMessage({
	variant,
	className,
	...props
}: React.ComponentProps<"div"> &
	Required<Pick<ChatMessageVariants, "variant">>) {
	return (
		<div
			data-slot="chat-message"
			data-variant={variant}
			className={cn(chatMessageVariants({ variant, className }))}
			{...props}
		/>
	);
}
