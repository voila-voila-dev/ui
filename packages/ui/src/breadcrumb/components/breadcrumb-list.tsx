import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function BreadcrumbList({
	className,
	...props
}: React.ComponentProps<"ol">) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(
				"flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}
