import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"p">;

export function StepTracksBodyDescription({ className, ...props }: Props) {
	return (
		<p
			data-slot="step-tracks-step-description"
			className={cn(
				"text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}
