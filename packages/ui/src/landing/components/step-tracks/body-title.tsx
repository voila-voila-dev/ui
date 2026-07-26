import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"h4">;

export function StepTracksBodyTitle({ className, ...props }: Props) {
	return (
		<h4
			data-slot="step-tracks-step-title"
			className={cn("mb-2 text-lg font-semibold", className)}
			{...props}
		/>
	);
}
