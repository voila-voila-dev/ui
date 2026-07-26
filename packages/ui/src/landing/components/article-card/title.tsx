import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"h3"> {}
export function ArticleCardTitle({ className, ...props }: Props) {
	return (
		<h3
			data-slot="article-card-title"
			className={cn(
				"mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-brand",
				className,
			)}
			{...props}
		/>
	);
}
