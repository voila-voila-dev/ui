import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"ul"> {}

export function SiteFooterColumnList({ className, ...props }: Props) {
	return (
		<ul
			data-slot="site-footer-column-list"
			className={cn("space-y-3", className)}
			{...props}
		/>
	);
}
