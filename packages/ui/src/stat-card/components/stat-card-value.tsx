import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}
export function StatCardValue({ className, ...props }: Props) {
	return (
		<div
			data-slot="stat-card-value"
			className={cn(
				"px-4 text-2xl font-semibold tracking-tight tabular-nums group-data-[size=sm]/card:px-3",
				className,
			)}
			{...props}
		/>
	);
}
