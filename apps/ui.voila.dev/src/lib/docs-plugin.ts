/**
 * Build-time plumbing for the docs content. Node-only: imported from
 * `vite.config.ts`, never from client code. Four jobs:
 *
 * - `docsPages()` enumerates every content slug so the static prerender does
 *   not depend on link crawling to find all 180+ pages.
 * - `docsManifest()` serves `virtual:docs-manifest` — the sidebar tree and the
 *   flat prev/next order — from frontmatter alone, without compiling MDX.
 * - `docsSearchIndex()` serves `virtual:docs-search-index` — the raw documents
 *   the ⌘K palette feeds to MiniSearch. A lazy virtual module rather than a
 *   JSON asset, so it code-splits away and only loads when search opens.
 * - `docsPropsWatch()` makes the dev server watch `packages/ui`, which the
 *   generated props tables are built from but nothing here imports.
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { toString as mdastToString } from "mdast-util-to-string";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Plugin } from "vite";
import { type DocFrontmatter, parseFrontmatter } from "./docs-frontmatter";
import type {
	DocsManifest,
	DocsManifestItem,
	DocsSearchDocument,
} from "./docs-manifest.types";
import { docsSections } from "./docs-nav.config";
import { invalidatePropsManifest } from "./remark-prop-table";

const contentDir = path.join(import.meta.dirname, "../content/docs");

interface DocFile {
	/** Absolute path to the .mdx file. */
	file: string;
	/** Root-absolute route, e.g. `/ui/button`. */
	slug: string;
	/** Directory under content/docs, e.g. `ui`. */
	dir: string;
	/** File stem, e.g. `button`. */
	stem: string;
}

function listDocFiles(): DocFile[] {
	const out: DocFile[] = [];
	for (const entry of readdirSync(contentDir, {
		recursive: true,
		withFileTypes: true,
	})) {
		if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue;
		const file = path.join(entry.parentPath, entry.name);
		const rel = path.relative(contentDir, file).replace(/\.mdx$/, "");
		const segments = rel.split(path.sep);
		out.push({
			file,
			slug: `/${segments.join("/")}`,
			dir: segments.slice(0, -1).join("/"),
			stem: segments[segments.length - 1] ?? "",
		});
	}
	return out;
}

function readManifest(): DocsManifest {
	const byDir = new Map<string, (DocFile & { fm: DocFrontmatter })[]>();
	for (const doc of listDocFiles()) {
		const fm = parseFrontmatter(
			path.relative(contentDir, doc.file),
			matter(readFileSync(doc.file, "utf8")).data,
		);
		const list = byDir.get(doc.dir) ?? [];
		list.push({ ...doc, fm });
		byDir.set(doc.dir, list);
	}

	// A directory of pages that no section claims renders nowhere: not in the
	// sidebar, not in prev/next, not in the breadcrumbs. Adding a section should
	// be a build error, not a page nobody can reach.
	const claimed = new Set(docsSections.map((section) => section.dir));
	const orphans = [...byDir.keys()].filter((dir) => !claimed.has(dir)).sort();
	if (orphans.length) {
		throw new Error(
			`content/docs has ${orphans.length} director(ies) with no entry in docsSections: ${orphans.join(", ")}. ` +
				"Add them to docs-nav.config.ts or their pages will not appear in the sidebar, prev/next or breadcrumbs.",
		);
	}

	const manifest: DocsManifest = { sections: [], flat: [] };
	for (const section of docsSections) {
		const docs = byDir.get(section.dir) ?? [];
		docs.sort(
			(a, b) =>
				a.fm.sidebar.order - b.fm.sidebar.order || a.stem.localeCompare(b.stem),
		);
		const items: DocsManifestItem[] = docs.map((d) => ({
			slug: d.slug,
			title: d.fm.title,
			description: d.fm.description,
		}));
		manifest.sections.push({
			label: section.label,
			dir: section.dir,
			collapsed: section.collapsed,
			items,
		});
		manifest.flat.push(
			...items.map((item) => ({ ...item, section: section.label })),
		);
	}
	return manifest;
}

function readSearchDocuments(): DocsSearchDocument[] {
	const sectionLabel = new Map(docsSections.map((s) => [s.dir, s.label]));
	const parser = unified().use(remarkParse);
	return listDocFiles().map((doc) => {
		const { data, content } = matter(readFileSync(doc.file, "utf8"));
		const fm = parseFrontmatter(path.relative(contentDir, doc.file), data);
		// Strip ESM and JSX lines so remark-parse sees plain markdown; the odd
		// leftover angle bracket only adds noise words, which MiniSearch shrugs at.
		const markdown = content
			.split("\n")
			.filter((line) => !/^\s*(import |export |<\/?[A-Z])/.test(line))
			.join("\n");
		const tree = parser.parse(markdown);
		const headings: string[] = [];
		visit(tree, "heading", (node) => {
			headings.push(mdastToString(node));
		});
		let text = "";
		visit(tree, ["paragraph", "tableCell", "listItem"], (node) => {
			text += `${mdastToString(node)} `;
		});
		return {
			slug: doc.slug,
			section: sectionLabel.get(doc.dir.split("/")[0] ?? "") ?? doc.dir,
			title: fm.title,
			description: fm.description,
			headings,
			text: text.slice(0, 8000),
		};
	});
}

/** Prerender targets for the Start plugin: every content page. */
export function docsPages(): { path: string }[] {
	return listDocFiles().map((doc) => ({ path: doc.slug }));
}

function virtualJsonPlugin(
	name: string,
	moduleId: string,
	build: () => unknown,
): Plugin {
	const resolvedId = `\0${moduleId}`;
	return {
		name,
		resolveId(id) {
			return id === moduleId ? resolvedId : undefined;
		},
		load(id) {
			if (id !== resolvedId) return undefined;
			return `export default JSON.parse(${JSON.stringify(JSON.stringify(build()))});`;
		},
		configureServer(server) {
			// Any content edit may reorder the sidebar or change the index.
			server.watcher.add(contentDir);
			server.watcher.on("all", (_event, file) => {
				if (!file.startsWith(contentDir)) return;
				const mod = server.moduleGraph.getModuleById(resolvedId);
				if (mod) server.moduleGraph.invalidateModule(mod);
			});
		},
	};
}

/**
 * Dev only: a props table is generated from `packages/ui`, which Vite has no
 * reason to watch — nothing in the docs imports the source. Without this, a prop
 * added to a component keeps showing the old table until the server restarts.
 */
export function docsPropsWatch(): Plugin {
	const packageSrc = path.join(
		import.meta.dirname,
		"../../../../packages/ui/src",
	);
	return {
		name: "voila:docs-props-watch",
		configureServer(server) {
			server.watcher.add(packageSrc);
			server.watcher.on("all", (_event, file) => {
				if (!file.startsWith(packageSrc)) return;
				invalidatePropsManifest();
				// The tables are baked into the compiled MDX, so every page that
				// carries one has to be recompiled.
				for (const mod of server.moduleGraph.idToModuleMap.values()) {
					if (mod.id?.endsWith(".mdx"))
						server.moduleGraph.invalidateModule(mod);
				}
				server.ws.send({ type: "full-reload" });
			});
		},
	};
}

export function docsManifest(): Plugin {
	return virtualJsonPlugin(
		"voila:docs-manifest",
		"virtual:docs-manifest",
		readManifest,
	);
}

export function docsSearchIndex(): Plugin {
	return virtualJsonPlugin(
		"voila:docs-search-index",
		"virtual:docs-search-index",
		readSearchDocuments,
	);
}
