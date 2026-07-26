import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"h3">;

export function NumberedCardTitle({ className, ...props }: Props) {
	return (
		<h3
			data-slot="numbered-cards-card-title"
			className={cn(
				"mb-2 font-heading text-xl font-bold tracking-tight text-foreground",
				className,
			)}
			{...props}
		/>
	);
}
