import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"p">;

export function SiteFooterBottomText({ className, ...props }: Props) {
	return (
		<p
			data-slot="site-footer-bottom-text"
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}
