import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"ul">;

export function SiteFooterColumnList({ className, ...props }: Props) {
	return (
		<ul
			data-slot="site-footer-column-list"
			className={cn("space-y-3", className)}
			{...props}
		/>
	);
}
