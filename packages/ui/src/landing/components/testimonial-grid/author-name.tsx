import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"p">;

export function TestimonialAuthorName({ className, ...props }: Props) {
	return (
		<p
			data-slot="testimonial-author-name"
			className={cn("text-sm font-semibold text-foreground", className)}
			{...props}
		/>
	);
}
