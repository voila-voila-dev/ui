import { AutoformatPlugin } from "@platejs/autoformat";
import {
	type AnyPlatePlugin,
	type PlateElementProps,
	toPlatePlugin,
} from "platejs/react";
import type { ComponentType } from "react";
import type {
	ContentCapability,
	ContentEditorMode,
	ContentFeature,
	ContentSlashItem,
	ContentToolbarItem,
} from "#/content-editor/features/feature-definition.tsx";
import {
	type ContentReaderRegistry,
	createContentReaderRegistry,
} from "#/content-editor/features/reader-registry.ts";

export interface ContentRegistry {
	readonly features: ReadonlyArray<ContentFeature>;
	readonly featureFor: (key: string) => ContentFeature | undefined;
	readonly mode: ContentEditorMode;
	readonly plugins: ReadonlyArray<AnyPlatePlugin>;
	readonly components: Readonly<
		Record<string, ComponentType<PlateElementProps>>
	>;
	readonly toolbarItems: (
		capabilities: ReadonlySet<ContentCapability>,
	) => ReadonlyArray<ContentToolbarItem>;
	readonly floatingItems: (
		capabilities: ReadonlySet<ContentCapability>,
	) => ReadonlyArray<ContentToolbarItem>;
	readonly slashItems: (
		capabilities: ReadonlySet<ContentCapability>,
	) => ReadonlyArray<ContentSlashItem>;
	readonly reader: ContentReaderRegistry;
}

function allowedIn(feature: ContentFeature, mode: ContentEditorMode): boolean {
	if (feature.allowIn !== undefined) {
		return feature.allowIn(mode);
	}
	// A feature that declares block nodes is for block editors; marks, links
	// and behaviours travel everywhere.
	const declaresBlocks = (feature.nodes ?? []).some(
		(node) => node.kind !== "inline",
	);
	return mode === "block" || !declaresBlocks;
}

function available(
	feature: ContentFeature,
	capabilities: ReadonlySet<ContentCapability>,
): boolean {
	return (feature.requires ?? []).every((capability) =>
		capabilities.has(capability),
	);
}

/**
 * The one place a feature list becomes an editor. The reader registry is
 * built first (it is what validates keys and node types), then every feature
 * still allowed in this mode contributes its plugins in declaration order.
 * Autoformat rules are pooled into one plugin because Plate keys plugins by
 * name and a second AutoformatPlugin would replace the first.
 */
export function createContentRegistry(
	features: ReadonlyArray<ContentFeature>,
	options: { readonly mode?: ContentEditorMode } = {},
): ContentRegistry {
	const mode = options.mode ?? "block";
	const reader = createContentReaderRegistry(features);
	const active = features.filter((feature) => allowedIn(feature, mode));
	const context = { mode, indentableTypes: reader.indentableTypes };

	const plugins: AnyPlatePlugin[] = active.flatMap((feature) => [
		...feature.plugins(context),
	]);
	const autoformat = active.flatMap((feature) => feature.autoformat ?? []);
	if (autoformat.length > 0) {
		plugins.push(
			toPlatePlugin(AutoformatPlugin).configure({
				options: { rules: autoformat, enableUndoOnDelete: true },
			}),
		);
	}

	const components = Object.assign(
		{},
		...active.map((feature) => feature.components ?? {}),
	) as Readonly<Record<string, ComponentType<PlateElementProps>>>;

	const items =
		<Item>(
			pick: (feature: ContentFeature) => ReadonlyArray<Item> | undefined,
		) =>
		(capabilities: ReadonlySet<ContentCapability>) =>
			active
				.filter((feature) => available(feature, capabilities))
				.flatMap((feature) => pick(feature) ?? []);

	return {
		features,
		featureFor: (key) => features.find((feature) => feature.key === key),
		mode,
		plugins,
		components,
		toolbarItems: items((feature) => feature.toolbar),
		floatingItems: items((feature) => feature.floating),
		slashItems: items((feature) => feature.slash),
		reader,
	};
}

export function toContentRegistry(
	features: ReadonlyArray<ContentFeature> | ContentRegistry,
	mode: ContentEditorMode,
): ContentRegistry {
	return Array.isArray(features)
		? createContentRegistry(features, { mode })
		: (features as ContentRegistry);
}
