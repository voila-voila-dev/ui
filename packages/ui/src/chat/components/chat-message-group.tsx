import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {
	align: "start" | "end";
}

export function ChatMessageGroup({ align, className, ...props }: Props) {
	return (
		<div
			data-slot="chat-message-group"
			data-align={align}
			className={cn(
				// `group` so descendants (e.g. ChatMessageTime) can react to the
				// group's `data-align` via `group-data-[align=end]:*`.
				"group flex flex-col gap-1",
				align === "end" ? "items-end" : "items-start",
				className,
			)}
			{...props}
		/>
	);
}
