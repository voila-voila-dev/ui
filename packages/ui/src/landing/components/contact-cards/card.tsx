import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"div">;

export function ContactCard({ className, ...props }: Props) {
	return (
		<div
			data-slot="contact-card"
			className={cn("rounded-2xl border border-border p-8", className)}
			{...props}
		/>
	);
}
