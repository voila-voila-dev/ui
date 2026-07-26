import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "#/lib/utils.ts";

export function CardDescription({
	className,
	render,
	...props
}: useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{ className: cn("text-sm text-muted-foreground", className) },
			props,
		),
		render,
		state: { slot: "card-description" },
	});
}
