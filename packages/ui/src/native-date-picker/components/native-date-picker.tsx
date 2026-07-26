import { CalendarBlankIcon } from "@phosphor-icons/react";
import type * as React from "react";
import { NativeDateField } from "#/native-date-picker/components/native-date-field.tsx";

export function NativeDatePicker(
	props: Omit<
		React.ComponentProps<typeof NativeDateField>,
		"type" | "slot" | "icon"
	>,
) {
	return (
		<NativeDateField
			type="date"
			slot="native-date-picker"
			icon={<CalendarBlankIcon />}
			{...props}
		/>
	);
}
