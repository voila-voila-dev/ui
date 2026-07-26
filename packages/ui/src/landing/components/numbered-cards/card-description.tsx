import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"p">;

export function NumberedCardDescription({ className, ...props }: Props) {
	return (
		<p
			data-slot="numbered-cards-card-description"
			className={cn("text-sm leading-relaxed text-muted-foreground", className)}
			{...props}
		/>
	);
}
