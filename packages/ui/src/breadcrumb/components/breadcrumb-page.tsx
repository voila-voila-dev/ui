import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"span"> {}

export function BreadcrumbPage({ className, ...props }: Props) {
	return (
		<span
			data-slot="breadcrumb-page"
			aria-current="page"
			className={cn("font-normal text-foreground", className)}
			{...props}
		/>
	);
}
