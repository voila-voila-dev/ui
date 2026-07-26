import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function BreadcrumbPage({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="breadcrumb-page"
			aria-current="page"
			className={cn("font-normal text-foreground", className)}
			{...props}
		/>
	);
}
