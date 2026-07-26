import { Heading } from "#/landing/components/heading.tsx";
import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<typeof Heading>;

export function PageHeaderTitle({ className, ...props }: Props) {
	return <Heading level="h1" className={cn("mb-4", className)} {...props} />;
}
