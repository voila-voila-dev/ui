import type { ReactNode } from "react";

interface Props {
	readonly children: ReactNode;
}
/** Two bounds side by side — the layout shared by every range field. */
export function FilterRangeRow({ children }: Props) {
	return (
		<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{children}</div>
	);
}
