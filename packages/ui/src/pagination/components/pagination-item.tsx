import type * as React from "react";

interface Props extends React.ComponentProps<"li"> {}

export function PaginationItem({ ...props }: Props) {
	return <li data-slot="pagination-item" {...props} />;
}
