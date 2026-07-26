import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"ul">;

export function ComparisonPanelList({ className, ...props }: Props) {
	return (
		<ul
			data-slot="comparison-panel-list"
			className={cn("space-y-3", className)}
			{...props}
		/>
	);
}
