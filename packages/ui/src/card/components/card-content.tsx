import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn } from "#/lib/utils.ts";

export function CardContent({
	className,
	render,
	...props
}: useRender.ComponentProps<"div">) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{ className: cn("px-4 group-data-[size=sm]/card:px-3", className) },
			props,
		),
		render,
		state: { slot: "card-content" },
	});
}
