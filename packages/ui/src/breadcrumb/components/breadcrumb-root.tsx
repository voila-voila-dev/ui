import type * as React from "react";

export function BreadcrumbRoot({
	className,
	...props
}: React.ComponentProps<"nav">) {
	return (
		<nav
			aria-label="breadcrumb"
			data-slot="breadcrumb"
			className={className}
			{...props}
		/>
	);
}
