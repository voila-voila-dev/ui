import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function ChatMessageSender({
	avatar,
	name,
	badge,
	className,
	...props
}: React.ComponentProps<"div"> & {
	avatar?: React.ReactNode;
	name: React.ReactNode;
	badge?: React.ReactNode;
}) {
	return (
		<div
			data-slot="chat-message-sender"
			className={cn("flex items-center gap-1.5 pt-1", className)}
			{...props}
		>
			{avatar}
			<span className="font-medium text-foreground text-xs">{name}</span>
			{badge}
		</div>
	);
}
