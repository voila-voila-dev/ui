import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function EmptyHeader({ className, ...props }: Props) {
	return (
		<div
			data-slot="empty-header"
			className={cn("flex max-w-sm flex-col items-center gap-2", className)}
			{...props}
		/>
	);
}
