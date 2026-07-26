import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function EmptyContent({ className, ...props }: Props) {
	return (
		<div
			data-slot="empty-content"
			className={cn(
				"flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance",
				className,
			)}
			{...props}
		/>
	);
}
