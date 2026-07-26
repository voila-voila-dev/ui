import { cn } from "#/lib/utils.ts";

export function SectionDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="section-description"
			className={cn(
				"text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
				className,
			)}
			{...props}
		/>
	);
}
