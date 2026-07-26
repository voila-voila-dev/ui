import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type * as React from "react";
import { Button } from "#/button/components/button.tsx";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {
	closeLabel?: string;
}
export function DialogFooter({
	className,
	closeLabel,
	children,
	...props
}: Props) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				"-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		>
			{closeLabel !== undefined && (
				<DialogPrimitive.Close
					data-slot="dialog-footer-close"
					render={<Button variant="outline" />}
				>
					{closeLabel}
				</DialogPrimitive.Close>
			)}
			{children}
		</div>
	);
}
