import {
	ColumnsPlusLeftIcon,
	ColumnsPlusRightIcon,
	RowsPlusBottomIcon,
	RowsPlusTopIcon,
	TableIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import {
	deleteColumn,
	deleteRow,
	deleteTable,
	insertTable,
	insertTableColumn,
	insertTableRow,
} from "@platejs/table";
import {
	TableCellHeaderPlugin,
	TableCellPlugin,
	TablePlugin,
	TableRowPlugin,
} from "@platejs/table/react";
import { PlateElement, type PlateElementProps } from "platejs/react";
import type {
	ContentEditorApi,
	ContentFeature,
	ContentToolbarItem,
} from "#/content-editor/features/feature-definition.tsx";
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

function insideTable(editor: ContentEditorApi): boolean {
	return (
		editor.selection !== null && editor.api.some({ match: { type: "table" } })
	);
}

function tableControl(
	key: string,
	icon: ContentToolbarItem["icon"],
	run: (editor: ContentEditorApi) => void,
): ContentToolbarItem {
	return { key, group: "table", icon, label: key, isVisible: insideTable, run };
}

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
	toolbar: [
		{
			key: "table",
			group: "insert",
			icon: TableIcon,
			label: "table",
			isVisible: (editor) => !insideTable(editor),
			run: (editor) =>
				insertTable(editor, { rowCount: 3, colCount: 3 }, { select: true }),
		},
		tableControl("addRowAbove", RowsPlusTopIcon, (editor) =>
			insertTableRow(editor, { before: true }),
		),
		tableControl("addRowBelow", RowsPlusBottomIcon, (editor) =>
			insertTableRow(editor),
		),
		tableControl("addColumnLeft", ColumnsPlusLeftIcon, (editor) =>
			insertTableColumn(editor, { before: true }),
		),
		tableControl("addColumnRight", ColumnsPlusRightIcon, (editor) =>
			insertTableColumn(editor),
		),
		tableControl("deleteRow", TrashIcon, (editor) => deleteRow(editor)),
		tableControl("deleteColumn", TrashIcon, (editor) => deleteColumn(editor)),
		tableControl("deleteTable", TrashIcon, (editor) => deleteTable(editor)),
	],
	slash: [
		{
			key: "table",
			icon: TableIcon,
			label: "table",
			keywords: ["table", "grid", "rows", "columns"],
			run: (editor) =>
				insertTable(editor, { rowCount: 3, colCount: 3 }, { select: true }),
		},
	],
};
