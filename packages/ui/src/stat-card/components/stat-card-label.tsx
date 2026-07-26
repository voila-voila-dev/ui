import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function StatCardLabel({ className, ...props }: Props) {
	return (
		<div
			data-slot="stat-card-label"
			className={cn("truncate text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}
