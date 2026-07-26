import { cn } from "#/lib/utils.ts";

export function SectionHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="section-header"
			className={cn("flex items-center justify-between gap-4", className)}
			{...props}
		/>
	);
}
