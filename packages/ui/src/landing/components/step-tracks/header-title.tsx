import { useContext } from "react";
import { StepTracksToneContext } from "#/landing/components/step-tracks/context/step-tracks-context.ts";
import { toneTextClass } from "#/landing/lib/tones.ts";
import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"h3">;

export function StepTracksHeaderTitle({ className, ...props }: Props) {
	const tone = useContext(StepTracksToneContext);

	return (
		<h3
			data-slot="step-tracks-header-title"
			className={cn("text-xl font-semibold", toneTextClass[tone], className)}
			{...props}
		/>
	);
}
