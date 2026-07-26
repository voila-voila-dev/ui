import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function ChatMessageGroup({
	align,
	className,
	...props
}: React.ComponentProps<"div"> & { align: "start" | "end" }) {
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
