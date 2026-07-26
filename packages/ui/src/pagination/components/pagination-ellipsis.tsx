import { DotsThreeIcon } from "@phosphor-icons/react";
import type * as React from "react";
import { cn } from "#/lib/utils.ts";

export function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		// Decorative gap indicator: `aria-hidden` hides it from the a11y tree, so
		// it carries no sr-only text (the old one was unreachable inside the hidden
		// subtree). The surrounding page links convey the skipped range.
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn(
				"flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			<DotsThreeIcon />
		</span>
	);
}
