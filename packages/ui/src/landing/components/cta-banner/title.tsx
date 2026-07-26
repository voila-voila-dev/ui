import { Heading } from "#/landing/components/heading.tsx";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<typeof Heading> {}
export function CtaBannerTitle({ className, ...props }: Props) {
	return (
		<Heading
			level="h2"
			align="center"
			className={cn("mb-4 text-white", className)}
			{...props}
		/>
	);
}
