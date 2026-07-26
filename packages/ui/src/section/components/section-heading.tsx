import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function SectionHeading({ className, ...props }: Props) {
	return (
		<div
			data-slot="section-heading"
			className={cn("flex min-w-0 flex-col gap-1", className)}
			{...props}
		/>
	);
}
