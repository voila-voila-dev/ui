import { cn } from "#/lib/utils.ts";

export function StatCardLabel({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="stat-card-label"
			className={cn("truncate text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}
