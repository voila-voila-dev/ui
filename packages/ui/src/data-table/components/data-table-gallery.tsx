import type { Row } from "@tanstack/react-table";
import type * as React from "react";
import { DataTableEmpty } from "#/data-table/components/data-table-empty.tsx";
import { DataTableLoadingOverlay } from "#/data-table/components/data-table-loading-overlay.tsx";
import { cn } from "#/lib/utils.ts";

interface Props<TData> {
	rows: Row<TData>[];
	loading: boolean;
	emptyState: React.ReactNode;
	onRowClick: ((row: TData) => void) | undefined;
	renderGalleryCard: (row: TData) => React.ReactNode;
	galleryClassName: string | undefined;
}

/** The card grid that replaces the table in gallery view — every row, no pages. */
export function DataTableGallery<TData>({
	rows,
	loading,
	emptyState,
	onRowClick,
	renderGalleryCard,
	galleryClassName,
}: Props<TData>) {
	return (
		<div data-slot="data-table-gallery" className="relative">
			<DataTableLoadingOverlay loading={loading} className="rounded-md" />
			{rows.length ? (
				<ul
					className={cn(
						"grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
						galleryClassName,
					)}
				>
					{rows.map((row) => (
						<li key={row.id} className="min-w-0">
							{onRowClick ? (
								<button
									type="button"
									className="h-full w-full rounded-lg border bg-card p-3 text-left transition-colors hover:bg-muted/50 active:bg-muted/50"
									onClick={() => onRowClick(row.original)}
								>
									{renderGalleryCard(row.original)}
								</button>
							) : (
								<div className="h-full rounded-lg border bg-card p-3">
									{renderGalleryCard(row.original)}
								</div>
							)}
						</li>
					))}
				</ul>
			) : (
				<div className="rounded-md border">
					{emptyState ?? <DataTableEmpty />}
				</div>
			)}
		</div>
	);
}
