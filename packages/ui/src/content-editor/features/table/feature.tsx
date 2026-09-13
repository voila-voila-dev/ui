import {
	TableCellHeaderPlugin,
	TableCellPlugin,
	TablePlugin,
	TableRowPlugin,
} from "@platejs/table/react";
import { PlateElement, type PlateElementProps } from "platejs/react";
import type { ContentFeature } from "#/content-editor/features/feature-definition.tsx";
import { tableReader } from "#/content-editor/features/table/reader.tsx";

export function TableElement({ children, ...props }: PlateElementProps) {
	return (
		<PlateElement
			{...props}
			as="table"
			className="w-full border-collapse text-left"
		>
			<tbody>{children}</tbody>
		</PlateElement>
	);
}

export function TableRowElement(props: PlateElementProps) {
	return <PlateElement {...props} as="tr" />;
}

export function TableCellElement(props: PlateElementProps) {
	return (
		<PlateElement
			{...props}
			as="td"
			className="border border-border px-2 py-1 align-top"
		/>
	);
}

export function TableHeaderCellElement(props: PlateElementProps) {
	return (
		<PlateElement
			{...props}
			as="th"
			className="border border-border bg-muted px-2 py-1 text-left font-medium"
		/>
	);
}

/** The row and column controls come with the toolbar parts. */
export const tableFeature: ContentFeature = {
	...tableReader,
	plugins: () => [
		TablePlugin,
		TableRowPlugin,
		TableCellPlugin,
		TableCellHeaderPlugin,
	],
	components: {
		table: TableElement,
		tr: TableRowElement,
		td: TableCellElement,
		th: TableHeaderCellElement,
	},
};
