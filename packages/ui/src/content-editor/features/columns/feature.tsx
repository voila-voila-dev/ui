import { ColumnsIcon } from "@phosphor-icons/react";
import {
	ColumnElement,
	ColumnsInspector,
	ColumnsView,
} from "#/content-editor/features/columns/columns-elements.tsx";
import { columnsPlugins } from "#/content-editor/features/columns/columns-plugin.ts";
import {
	COLUMN_TYPE,
	COLUMNS_DESKTOP_COUNTS,
	COLUMNS_MOBILE_COUNTS,
	COLUMNS_TYPE,
	type ContentColumnsNode,
	columnNode,
	columnsNode,
	freshColumns,
} from "#/content-editor/features/columns/reader.tsx";
import type {
	ContentEditorApi,
	ContentSlashItem,
	ContentToolbarItem,
} from "#/content-editor/features/feature-definition.tsx";
import { paragraphNode } from "#/content-editor/features/paragraph/reader.tsx";
import { defineElementFeature } from "#/content-editor/lib/define-element-feature.ts";
import { insertBlockBelow } from "#/content-editor/lib/insert-block.ts";

/**
 * Inserts a row of two columns with the caret in the first. From inside a
 * column, the row goes after the one the caret is in: a column holds
 * leaves only.
 */
function insertColumns(editor: ContentEditorApi) {
	const row = freshColumns();
	const around = editor.api.above({ match: { type: COLUMNS_TYPE } });
	const block = editor.api.block();
	if (
		around === undefined &&
		block !== undefined &&
		block[1].length === 1 &&
		editor.api.isEmpty(block[0])
	) {
		// The empty line the slash was typed on stays, under the row, as the
		// line the caret leaves the row for.
		editor.tf.insertNodes(row as never, { at: block[1] });
	} else if (around === undefined) {
		insertBlockBelow(editor, row);
	} else {
		const after = [around[1][0] + 1];
		editor.tf.insertNodes([row, paragraphNode.createNode()] as never, {
			at: after,
		});
	}
	const inserted = editor.api.node({ at: [], match: { id: row.id } });
	const start =
		inserted === undefined ? undefined : editor.api.start(inserted[1]);
	if (start !== undefined) {
		editor.tf.select(start);
	}
}

const defined = defineElementFeature<ContentColumnsNode>({
	key: "columns",
	kind: "container",
	node: columnsNode,
	fields: [
		{
			type: "select",
			key: "desktopColumns",
			label: "columnsDesktop",
			options: COLUMNS_DESKTOP_COUNTS.map((count) => ({
				value: count,
				label: String(count),
			})),
		},
		{
			type: "select",
			key: "mobileColumns",
			label: "columnsMobile",
			description: "columnsMobileDescription",
			options: COLUMNS_MOBILE_COUNTS.map((count) => ({
				value: count,
				label: String(count),
			})),
		},
	],
	defaults: { desktopColumns: 2, mobileColumns: 1 },
	view: ColumnsView,
	inspector: ColumnsInspector,
	plugins: columnsPlugins,
});

const slashItem: ContentSlashItem = {
	key: "columns",
	icon: ColumnsIcon,
	label: "columns",
	keywords: ["columns", "grid", "layout", "side by side"],
	run: insertColumns,
};

/**
 * A row of one to four columns (`columns` > `column` > blocks), the email
 * block editor's `grid` with the same `desktopColumns` and
 * `mobileColumns`. Not in a preset: a host adds it where a layout belongs.
 */
export const columnsFeature = {
	...defined,
	nodes: [{ ...columnsNode, createNode: freshColumns }, columnNode] as const,
	components: { ...defined.components, [COLUMN_TYPE]: ColumnElement },
	slash: [slashItem],
	toolbar: [{ ...slashItem, group: "insert" } satisfies ContentToolbarItem],
};
