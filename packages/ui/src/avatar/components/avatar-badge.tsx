import type * as React from "react";
import { avatarBadgeVariants } from "#/avatar/components/avatar-badge-variants.ts";
import type { VariantProps } from "#/lib/cva.ts";
import { cn } from "#/lib/utils.ts";

export function AvatarBadge({
	className,
	status,
	...props
}: React.ComponentProps<"span"> & VariantProps<typeof avatarBadgeVariants>) {
	return (
		<span
			data-slot="avatar-badge"
			data-status={status}
			className={cn(avatarBadgeVariants({ status }), className)}
			{...props}
		/>
	);
}
