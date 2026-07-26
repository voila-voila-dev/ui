import type * as React from "react";
import { alertVariants } from "#/alert/components/alert-variants.ts";
import type { VariantProps } from "#/lib/cva.ts";
import { cn } from "#/lib/utils.ts";

export function AlertRoot({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}
