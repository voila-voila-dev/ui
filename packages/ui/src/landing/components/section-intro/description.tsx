import { Text } from "#/landing/components/text.tsx";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<typeof Text> {}

export function SectionIntroDescription({ className, ...props }: Props) {
	return (
		<Text
			data-slot="section-intro-description"
			variant="lead"
			align="center"
			className={cn(className)}
			{...props}
		/>
	);
}
