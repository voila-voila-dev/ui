import { cn } from "#/lib/utils.ts";

interface Props extends React.ComponentProps<"p"> {}
export function SectionDescription({ className, ...props }: Props) {
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
