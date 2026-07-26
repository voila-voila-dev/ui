import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}
export function SectionActions({ className, ...props }: Props) {
	return (
		<div
			data-slot="section-actions"
			className={cn("flex shrink-0 items-center gap-2", className)}
			{...props}
		/>
	);
}
