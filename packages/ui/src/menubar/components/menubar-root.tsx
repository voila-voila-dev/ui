import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { cn } from "#/lib/utils.ts";

export function MenubarRoot({ className, ...props }: MenubarPrimitive.Props) {
	return (
		<MenubarPrimitive
			data-slot="menubar"
			className={cn(
				"flex h-8 w-fit items-center gap-0.5 rounded-lg border p-[3px]",
				className,
			)}
			{...props}
		/>
	);
}
