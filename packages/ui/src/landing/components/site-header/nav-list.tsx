import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"ul"> {}

export function SiteHeaderNavList({ className, ...props }: Props) {
	return (
		<ul
			data-slot="site-header-nav-list"
			className={cn("flex items-center gap-6", className)}
			{...props}
		/>
	);
}
