import type * as React from "react";
import { Button } from "#/button/components/button.tsx";

export function TimePickerOption({
	time,
	label,
	selected,
	selectedOptionRef,
	onSelect,
}: {
	time: string;
	label: string;
	selected: boolean;
	selectedOptionRef: React.Ref<HTMLButtonElement>;
	onSelect: (time: string) => void;
}) {
	return (
		<Button
			role="option"
			aria-selected={selected}
			data-selected={selected || undefined}
			variant="ghost"
			size="sm"
			className="shrink-0 justify-center font-normal data-selected:bg-primary data-selected:text-primary-foreground data-selected:hover:bg-primary data-selected:hover:text-primary-foreground"
			ref={selected ? selectedOptionRef : undefined}
			onClick={() => onSelect(time)}
		>
			{label}
		</Button>
	);
}
