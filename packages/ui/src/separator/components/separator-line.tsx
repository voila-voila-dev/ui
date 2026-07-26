import type { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "#/lib/utils.ts";

interface Props {
	orientation: NonNullable<SeparatorPrimitive.Props["orientation"]>;
}
export function SeparatorLine({ orientation }: Props) {
	return (
		<span
			aria-hidden
			data-slot="separator-line"
			className={cn(
				"flex-1 bg-border",
				orientation === "vertical" ? "w-px" : "h-px",
			)}
		/>
	);
}
