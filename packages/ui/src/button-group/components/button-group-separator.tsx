import * as React from "react";
import { ButtonGroupContext } from "#/button-group/context/button-group-context.tsx";
import { cn } from "#/lib/utils.ts";
import { Separator } from "#/separator/components/separator.tsx";

export function ButtonGroupSeparator({
	className,
	orientation,
	...props
}: React.ComponentProps<typeof Separator>) {
	const groupOrientation = React.useContext(ButtonGroupContext);
	return (
		<Separator
			data-slot="button-group-separator"
			// A horizontal group needs a vertical rule between members, and
			// vice versa - derived from the group so consumers never pass it.
			orientation={
				orientation ??
				(groupOrientation === "horizontal" ? "vertical" : "horizontal")
			}
			className={cn(
				"relative self-stretch bg-input data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto",
				className,
			)}
			{...props}
		/>
	);
}
