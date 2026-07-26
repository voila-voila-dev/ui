import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"h3">;

export function FeatureGridCardTitle({ className, ...props }: Props) {
	return (
		<h3
			data-slot="feature-grid-card-title"
			className={cn(
				"mb-2 font-heading text-xl font-bold tracking-tight text-foreground",
				className,
			)}
			{...props}
		/>
	);
}
