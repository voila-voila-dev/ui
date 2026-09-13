import type { ContentNodeLike } from "#/content-editor/features/content-value.ts";
import type {
	ContentFeatureReader,
	ContentInsertableNodeReader,
	ContentNodeReader,
} from "#/content-editor/features/reader-definition.tsx";
import { newContentNodeId } from "#/content-editor/lib/ids.ts";
import {
	classAttribute,
	idAttribute,
} from "#/content-editor/reader/escape-html.ts";

export interface ContentTableNode extends ContentNodeLike {
	readonly type: "table";
	readonly id?: string;
}
export interface ContentTableRowNode extends ContentNodeLike {
	readonly type: "tr";
}
export interface ContentTableCellNode extends ContentNodeLike {
	readonly type: "td";
}
export interface ContentTableHeaderCellNode extends ContentNodeLike {
	readonly type: "th";
}

export const tableNode: ContentInsertableNodeReader<ContentTableNode> = {
	type: "table",
	createNode: (init) => ({
		id: newContentNodeId(),
		type: "table",
		children: [],
		...init,
	}),
	Render: ({ node, children, options }) => (
		<div className="overflow-x-auto">
			<table
				id={options.idFor?.(node) ?? node.id}
				className={
					options.classNameFor?.("table") ?? "w-full border-collapse text-left"
				}
			>
				<tbody>{children}</tbody>
			</table>
		</div>
	),
	toHtml: (node, children, options) =>
		`<table${idAttribute(options.idFor?.(node) ?? node.id)}${classAttribute(options.classNameFor?.("table"))}><tbody>${children}</tbody></table>`,
};

export const tableRowNode: ContentNodeReader<ContentTableRowNode> = {
	type: "tr",
	Render: ({ children }) => <tr>{children}</tr>,
	toHtml: (_node, children) => `<tr>${children}</tr>`,
};

export const tableCellNode: ContentNodeReader<ContentTableCellNode> = {
	type: "td",
	Render: ({ children, options }) => (
		<td
			className={
				options.classNameFor?.("td") ??
				"border border-border px-2 py-1 align-top"
			}
		>
			{children}
		</td>
	),
	toHtml: (_node, children, options) =>
		`<td${classAttribute(options.classNameFor?.("td"))}>${children}</td>`,
};

export const tableHeaderCellNode: ContentNodeReader<ContentTableHeaderCellNode> =
	{
		type: "th",
		Render: ({ children, options }) => (
			<th
				className={
					options.classNameFor?.("th") ??
					"border border-border bg-muted px-2 py-1 text-left font-medium"
				}
			>
				{children}
			</th>
		),
		toHtml: (_node, children, options) =>
			`<th${classAttribute(options.classNameFor?.("th"))}>${children}</th>`,
	};

export const tableReader = {
	key: "table",
	nodes: [tableNode, tableRowNode, tableCellNode, tableHeaderCellNode],
} satisfies ContentFeatureReader;
