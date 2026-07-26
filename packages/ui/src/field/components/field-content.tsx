import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}
export function FieldContent({ className, ...props }: Props) {
	return (
		<div
			data-slot="field-content"
			className={cn(
				"group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
				className,
			)}
			{...props}
		/>
	);
}
