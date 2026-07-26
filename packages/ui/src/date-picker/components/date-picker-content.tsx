import type * as React from "react";
import { Popover } from "#/popover/components/popover.tsx";

interface Props {
	children: React.ReactNode;
}

export function DatePickerContent({ children }: Props) {
	return (
		<Popover.Content
			data-slot="date-picker-content"
			className="w-auto p-0"
			align="start"
		>
			{children}
		</Popover.Content>
	);
}
