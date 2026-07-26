import type * as React from "react";
import {
	type ChatMessageVariants,
	chatMessageVariants,
} from "#/chat/components/chat-message-variants.ts";
import { cn } from "#/lib/utils.ts";

interface Props
	extends React.ComponentProps<"div">,
		Required<Pick<ChatMessageVariants, "variant">> {}

export function ChatMessage({ variant, className, ...props }: Props) {
	return (
		<div
			data-slot="chat-message"
			data-variant={variant}
			className={cn(chatMessageVariants({ variant, className }))}
			{...props}
		/>
	);
}
