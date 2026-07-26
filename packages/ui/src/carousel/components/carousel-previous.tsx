import { CaretLeftIcon } from "@phosphor-icons/react";
import type * as React from "react";
import { Button } from "#/button/components/button.tsx";
import { useCarousel } from "#/carousel/context/carousel-context.tsx";
import { cn } from "#/lib/utils.ts";

export function CarouselPrevious({
	className,
	variant = "outline",
	size = "icon-sm",
	inset = false,
	...props
}: React.ComponentProps<typeof Button> & { inset?: boolean }) {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			data-slot="carousel-previous"
			data-orientation={orientation}
			variant={variant}
			size={size}
			className={cn(
				"absolute touch-manipulation rounded-full dark:border-foreground/25 dark:bg-background",
				"data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:-translate-y-1/2",
				"data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:rotate-90",
				inset
					? "data-[orientation=horizontal]:left-2 data-[orientation=vertical]:top-2"
					: "data-[orientation=horizontal]:-left-12 data-[orientation=vertical]:-top-12",
				className,
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<CaretLeftIcon />
			<span className="sr-only">Previous slide</span>
		</Button>
	);
}
