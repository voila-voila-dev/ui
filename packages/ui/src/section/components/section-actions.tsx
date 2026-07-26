import { cn } from "#/lib/utils.ts";

export function SectionActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="section-actions"
			className={cn("flex shrink-0 items-center gap-2", className)}
			{...props}
		/>
	);
}
