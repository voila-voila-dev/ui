import { cn } from "#/lib/utils.ts";

export function EmptyTitle({
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			data-slot="empty-title"
			className={cn("text-sm font-medium tracking-tight", className)}
			{...props}
		/>
	);
}
