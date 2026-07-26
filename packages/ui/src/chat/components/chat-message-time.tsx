import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function ChatMessageTime({
	className,
	...props
}: React.ComponentProps<"time">) {
	return (
		<time
			data-slot="chat-message-time"
			className={cn(
				"select-none text-xs opacity-70 group-data-[align=end]:text-primary-foreground",
				className,
			)}
			{...props}
		/>
	);
}
