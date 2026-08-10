import type * as React from "react";
import { AvatarFallback } from "#/avatar/components/avatar-fallback.tsx";
import { AvatarImage } from "#/avatar/components/avatar-image.tsx";
import { AvatarRoot } from "#/avatar/components/avatar-root.tsx";
import { cn } from "#/lib/utils.ts";

interface Props extends Omit<React.ComponentProps<"div">, "children"> {
	/** Logo image URL, shown large above the name. */
	src?: string;
	/** `alt` for the logo. Defaults to empty — the name sits right below it. */
	alt?: string;
	/**
	 * Shown in the logo frame while the image loads or when there is none.
	 * Defaults to the first letter of `name` when it is a string.
	 */
	fallback?: React.ReactNode;
	/** The main line, under the logo. */
	name: React.ReactNode;
	/** The muted line under the name — the entry's activity or category. */
	activity?: React.ReactNode;
}

/**
 * Directory-entry card for gallery view: the logo large on top, the name
 * below it, the activity last. Return it from `renderGalleryCard`.
 */
export function DataTableGalleryCard({
	src,
	alt = "",
	fallback,
	name,
	activity,
	className,
	...props
}: Props) {
	return (
		<div
			data-slot="data-table-gallery-card"
			className={cn("flex h-full flex-col items-center gap-2", className)}
			{...props}
		>
			<div className="aspect-square w-full max-w-32">
				<AvatarRoot className="size-full rounded-lg after:rounded-lg">
					{src !== undefined && (
						<AvatarImage src={src} alt={alt} className="rounded-lg" />
					)}
					<AvatarFallback className="rounded-lg font-medium text-3xl">
						{fallback ??
							(typeof name === "string" ? name.charAt(0).toUpperCase() : null)}
					</AvatarFallback>
				</AvatarRoot>
			</div>
			<div className="w-full min-w-0 text-center">
				<p className="truncate font-medium text-sm">{name}</p>
				{activity !== undefined && (
					<p className="truncate text-muted-foreground text-xs">{activity}</p>
				)}
			</div>
		</div>
	);
}
