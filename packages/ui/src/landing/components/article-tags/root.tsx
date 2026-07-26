import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"div">;

/** Tag chip row for blog articles. */
export function ArticleTagsRoot({ className, ...props }: Props) {
	return (
		<div
			data-slot="article-tags"
			className={cn("flex flex-wrap gap-2", className)}
			{...props}
		/>
	);
}
