import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"div">;

export function BentoGridFeaturedContent({ className, ...props }: Props) {
	return (
		<div
			data-slot="bento-featured-content"
			className={cn("relative", className)}
			{...props}
		/>
	);
}
