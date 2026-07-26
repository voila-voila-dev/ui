import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function SectionHeader({ className, ...props }: Props) {
	return (
		<div
			data-slot="section-header"
			className={cn("flex items-center justify-between gap-4", className)}
			{...props}
		/>
	);
}
