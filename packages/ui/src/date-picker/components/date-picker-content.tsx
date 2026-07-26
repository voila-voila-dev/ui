import type * as React from "react";
import { Popover } from "#/popover/components/popover.tsx";

export function DatePickerContent({ children }: { children: React.ReactNode }) {
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
