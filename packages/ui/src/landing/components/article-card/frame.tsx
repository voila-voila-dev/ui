import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"article">;

/** The card surface (Astro `Card` default/none/lift as `article`). */
export function ArticleCardFrame({ className, ...props }: Props) {
	return (
		<article
			data-slot="article-card-frame"
			className={cn(
				"rounded-lg border border-border bg-card text-card-foreground transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
				className,
			)}
			{...props}
		/>
	);
}
