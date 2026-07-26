import { cn } from "#/lib/utils.ts";

export function SectionHeading({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="section-heading"
			className={cn("flex min-w-0 flex-col gap-1", className)}
			{...props}
		/>
	);
}
