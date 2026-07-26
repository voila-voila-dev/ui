import type * as React from "react";

interface Props {
	rowCount: number | undefined;
	renderMobileRow: (index: number) => React.ReactNode;
	mobileAddRow: React.ReactNode;
}

/** The below-`md` replacement for the table: one card per row. */
export function SpreadsheetMobileList({
	rowCount,
	renderMobileRow,
	mobileAddRow,
}: Props) {
	return (
		<div data-slot="spreadsheet-mobile-list" className="flex flex-col gap-3">
			{rowCount !== undefined && rowCount > 0 ? (
				<ul className="flex flex-col gap-2">
					{Array.from({ length: rowCount }, (_, index) => (
						<li
							// Index keys are safe here: the card fields are controlled by
							// the consumer's row state, never by DOM state.
							key={index}
							data-slot="spreadsheet-mobile-card"
							className="rounded-lg border border-input bg-card p-3"
						>
							{renderMobileRow(index)}
						</li>
					))}
				</ul>
			) : null}
			{mobileAddRow}
		</div>
	);
}
