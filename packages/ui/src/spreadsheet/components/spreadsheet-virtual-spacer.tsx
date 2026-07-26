interface Props {
	height: number;
}

/** Keeps the scrollbar honest for the unmounted rows above/below the window. */
export function SpreadsheetVirtualSpacer({ height }: Props) {
	if (height <= 0) {
		return null;
	}
	return (
		<tr data-slot="spreadsheet-virtual-spacer">
			<td
				aria-hidden="true"
				colSpan={1000}
				className="border-0 p-0"
				style={{ height }}
			/>
		</tr>
	);
}
