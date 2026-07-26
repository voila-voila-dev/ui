import { Heading } from "#/landing/components/heading.tsx";
import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<typeof Heading>;

export function SectionIntroTitle({ className, ...props }: Props) {
	return (
		<Heading
			level="h2"
			align="center"
			className={cn("mb-4", className)}
			{...props}
		/>
	);
}
