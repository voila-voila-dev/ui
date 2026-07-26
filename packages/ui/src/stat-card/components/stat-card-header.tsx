import { cn } from "#/lib/utils.ts";

export function StatCardHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="stat-card-header"
			className={cn(
				"flex items-center justify-between gap-2 px-4 group-data-[size=sm]/card:px-3",
				className,
			)}
			{...props}
		/>
	);
}
