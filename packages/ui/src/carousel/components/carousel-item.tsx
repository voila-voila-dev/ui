import type * as React from "react";
import { useCarousel } from "#/carousel/context/carousel-context.tsx";
import { cn } from "#/lib/utils.ts";

export function CarouselItem({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { orientation } = useCarousel();

	return (
		<div
			role="group"
			aria-roledescription="slide"
			data-slot="carousel-item"
			data-orientation={orientation}
			className={cn(
				"min-w-0 shrink-0 grow-0 basis-full data-[orientation=horizontal]:pl-4 data-[orientation=vertical]:pt-4",
				className,
			)}
			{...props}
		/>
	);
}
