import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"blockquote">;

export function TestimonialQuote({ className, children, ...props }: Props) {
	return (
		<blockquote
			data-slot="testimonial-quote"
			className={cn("flex-1 text-foreground", className)}
			{...props}
		>
			<p className="leading-relaxed">{children}</p>
		</blockquote>
	);
}
