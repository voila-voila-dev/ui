import { cn } from "#/lib/utils.ts";

type Props = React.ComponentProps<"p">;

export function LogoMarqueeTitle({ className, ...props }: Props) {
	return (
		<p
			data-slot="logo-marquee-title"
			className={cn(
				"mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}
