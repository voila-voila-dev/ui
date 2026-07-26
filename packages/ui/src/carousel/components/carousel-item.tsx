import type * as React from "react";
import { useCarousel } from "#/carousel/hooks/use-carousel.ts";
import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"div"> {}

export function CarouselItem({ className, ...props }: Props) {
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
