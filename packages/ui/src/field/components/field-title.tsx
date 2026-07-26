import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}
export function FieldTitle({ className, ...props }: Props) {
	return (
		<div
			data-slot="field-title"
			className={cn(
				"flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}
