import { cva, type VariantProps } from "#/lib/cva.ts";
import { cn } from "#/lib/utils.ts";

const fieldVariants = cva({
	base: "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
	variants: {
		orientation: {
			vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
			// Direct checkbox/radio children get a 1px nudge (`mt-px`) so they
			// optically align with the first line of an adjacent FieldContent.
			horizontal:
				"flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
			// Vertical below the @md container breakpoint, horizontal above it.
			responsive:
				"flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
		},
	},
	defaultVariants: {
		orientation: "vertical",
	},
});

export function FieldRoot({
	className,
	orientation = "vertical",
	invalid,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof fieldVariants> & { invalid?: boolean }) {
	return (
		<div
			role="group"
			data-slot="field"
			data-orientation={orientation}
			data-invalid={invalid || undefined}
			className={cn(fieldVariants({ orientation }), className)}
			{...props}
		/>
	);
}
