import type * as React from "react";
import { bannerVariants } from "#/banner/components/banner-variants.ts";
import type { VariantProps } from "#/lib/cva.ts";
import { cn } from "#/lib/utils.ts";

export function BannerRoot({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof bannerVariants>) {
	return (
		<div
			data-slot="banner"
			role="status"
			className={cn(bannerVariants({ variant }), className)}
			{...props}
		/>
	);
}
