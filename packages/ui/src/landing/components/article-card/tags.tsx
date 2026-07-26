import { ArticleTags } from "#/landing/components/article-tags/index.ts";
import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"div">;

export function ArticleCardTags({ className, ...props }: Props) {
	return <ArticleTags.Root className={cn("mb-3", className)} {...props} />;
}
