import { cn } from "#/lib/utils.ts";

export type EmptyProps = React.ComponentProps<"div"> & {
	bordered?: boolean;
};

export function EmptyRoot({
	className,
	bordered = false,
	...props
}: EmptyProps) {
	return (
		<div
			data-slot="empty"
			data-bordered={bordered || undefined}
			className={cn(
				"flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl p-6 text-center text-balance",
				bordered && "border border-dashed",
				className,
			)}
			{...props}
		/>
	);
}
