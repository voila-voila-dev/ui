import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"div">;

/** Illustration column — hidden below `lg`. */
export function ComparisonMedia({ className, ...props }: Props) {
	return (
		<div
			data-slot="comparison-media"
			className={cn("hidden lg:block", className)}
			{...props}
		/>
	);
}
