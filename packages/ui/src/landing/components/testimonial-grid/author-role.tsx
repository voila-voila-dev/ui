import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"p">;

export function TestimonialAuthorRole({ className, ...props }: Props) {
	return (
		<p
			data-slot="testimonial-author-role"
			className={cn("text-xs text-muted-foreground", className)}
			{...props}
		/>
	);
}
