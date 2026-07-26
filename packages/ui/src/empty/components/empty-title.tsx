import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"h3"> {}

export function EmptyTitle({ className, ...props }: Props) {
	return (
		<h3
			data-slot="empty-title"
			className={cn("text-sm font-medium tracking-tight", className)}
			{...props}
		/>
	);
}
