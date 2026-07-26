import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"h3">;

export function BentoGridItemTitle({ className, ...props }: Props) {
	return (
		<h3
			data-slot="bento-item-title"
			className={cn("mb-2 font-heading text-xl font-semibold", className)}
			{...props}
		/>
	);
}
