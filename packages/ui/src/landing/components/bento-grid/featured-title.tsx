import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"h3"> {}

export function BentoGridFeaturedTitle({ className, ...props }: Props) {
	return (
		<h3
			data-slot="bento-featured-title"
			className={cn(
				"font-heading text-5xl font-bold tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}
