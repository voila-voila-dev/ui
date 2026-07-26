import { cva } from "#/lib/cva.ts";

/**
 * Sizing is driven by the parent `Avatar.Root`'s `data-size` rather than a cva
 * axis, so the badge always tracks the avatar it is anchored to. Only `status`
 * is a real variant - it overrides the base `bg-primary`/`text-primary-*` via
 * tailwind-merge, so leaving it unset keeps the neutral primary dot.
 */
export const avatarBadgeVariants = cva({
	base: "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none group-data-[size=sm]/avatar:size-2 group-data-[size=default]/avatar:size-2.5 group-data-[size=lg]/avatar:size-3 group-data-[size=sm]/avatar:[&>svg]:hidden group-data-[size=default]/avatar:[&>svg]:size-2 group-data-[size=lg]/avatar:[&>svg]:size-2",
	variants: {
		status: {
			online: "bg-success text-success-foreground",
			offline: "bg-muted-foreground text-muted",
			busy: "bg-destructive text-destructive-foreground",
		},
	},
});
