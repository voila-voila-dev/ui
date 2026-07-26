import { cn } from "#/lib/utils.ts";

export function FieldTitle({
	className,
	...props
}: React.ComponentProps<"div">) {
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
