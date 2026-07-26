import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"h3">;

export function SiteFooterColumnTitle({ className, ...props }: Props) {
	return (
		<h3
			data-slot="site-footer-column-title"
			className={cn("mb-4 text-sm font-semibold text-foreground", className)}
			{...props}
		/>
	);
}
