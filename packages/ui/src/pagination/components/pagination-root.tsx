import type * as React from "react";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"nav"> {}
export function PaginationRoot({ className, ...props }: Props) {
	return (
		<nav
			// Sentence case to match the kit's other nav labels; spread-overridable
			// (e.g. a French `aria-label="Pagination"`) since `{...props}` wins.
			aria-label="Pagination"
			data-slot="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
}
