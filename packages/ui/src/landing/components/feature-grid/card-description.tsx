import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"p">;

export function FeatureGridCardDescription({ className, ...props }: Props) {
	return (
		<p
			data-slot="feature-grid-card-description"
			className={cn("text-sm leading-relaxed text-muted-foreground", className)}
			{...props}
		/>
	);
}
