import { cva, type VariantProps } from "#/lib/cva.ts";
import { cn } from "#/lib/utils.ts";

const fieldLegendVariants = cva({
	base: "mb-1.5 font-medium",
	variants: {
		variant: {
			legend: "text-base",
			label: "text-sm",
		},
	},
	defaultVariants: {
		variant: "legend",
	},
});

export function FieldLegend({
	className,
	variant = "legend",
	...props
}: React.ComponentProps<"legend"> & VariantProps<typeof fieldLegendVariants>) {
	return (
		<legend
			data-slot="field-legend"
			data-variant={variant}
			className={cn(fieldLegendVariants({ variant }), className)}
			{...props}
		/>
	);
}
