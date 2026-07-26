import { XIcon } from "@phosphor-icons/react";
import type * as React from "react";
import { AlertAction } from "#/alert/components/alert-action.tsx";
import { buttonVariants } from "#/button/components/button-variants.ts";
import { cn } from "#/lib/utils.ts";

export function AlertClose({
	className,
	...props
}: React.ComponentProps<"button">) {
	return (
		<AlertAction>
			<button
				type="button"
				data-slot="alert-close"
				aria-label="Dismiss"
				className={cn(
					buttonVariants({ variant: "ghost", size: "icon-xs" }),
					"text-muted-foreground",
					className,
				)}
				{...props}
			>
				<XIcon />
			</button>
		</AlertAction>
	);
}
