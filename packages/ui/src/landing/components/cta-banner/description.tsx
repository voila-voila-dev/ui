import { Text } from "#/landing/components/text.tsx";
import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<typeof Text>;

export function CtaBannerDescription({ className, ...props }: Props) {
	return (
		<Text className={cn("mb-8 text-lg text-white/90", className)} {...props} />
	);
}
