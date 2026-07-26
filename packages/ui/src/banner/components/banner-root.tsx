import type * as React from "react";
import { bannerVariants } from "#/banner/components/banner-variants.ts";
import type { VariantProps } from "#/lib/cva.ts";
import { cn } from "#/lib/utils.ts";

interface Props
	extends React.ComponentProps<"div">,
		VariantProps<typeof bannerVariants> {}

export function BannerRoot({ className, variant, ...props }: Props) {
	return (
		<div
			data-slot="banner"
			role="status"
			className={cn(bannerVariants({ variant }), className)}
			{...props}
		/>
	);
}
