import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cn } from "#/lib/utils.ts";

export function NavigationMenuIndicator({
	className,
	...props
}: NavigationMenuPrimitive.Icon.Props) {
	return (
		<NavigationMenuPrimitive.Icon
			data-slot="navigation-menu-indicator"
			className={cn(
				"top-full z-1 flex h-1.5 items-end justify-center overflow-hidden",
				className,
			)}
			{...props}
		>
			<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
		</NavigationMenuPrimitive.Icon>
	);
}
