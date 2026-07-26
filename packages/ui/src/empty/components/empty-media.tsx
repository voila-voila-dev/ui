import { cva, type VariantProps } from "#/lib/cva.ts";
import { cn } from "#/lib/utils.ts";

const emptyMediaVariants = cva({
	base: "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
	variants: {
		variant: {
			default: "bg-transparent",
			icon: "rounded-lg bg-muted text-foreground",
		},
		size: {
			sm: "",
			default: "",
			lg: "",
		},
	},
	compoundVariants: [
		{
			variant: "icon",
			size: "sm",
			className: "size-6 [&_svg:not([class*='size-'])]:size-3.5",
		},
		{
			variant: "icon",
			size: "default",
			className: "size-8 [&_svg:not([class*='size-'])]:size-4",
		},
		{
			variant: "icon",
			size: "lg",
			className: "size-10 [&_svg:not([class*='size-'])]:size-6",
		},
	],
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export function EmptyMedia({
	className,
	variant = "default",
	size = "default",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
	return (
		<div
			data-slot="empty-media"
			data-variant={variant}
			data-size={size}
			className={cn(emptyMediaVariants({ variant, size }), className)}
			{...props}
		/>
	);
}
