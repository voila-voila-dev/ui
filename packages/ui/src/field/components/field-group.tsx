import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function FieldGroup({ className, ...props }: Props) {
	return (
		<div
			data-slot="field-group"
			className={cn(
				"group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
				className,
			)}
			{...props}
		/>
	);
}
