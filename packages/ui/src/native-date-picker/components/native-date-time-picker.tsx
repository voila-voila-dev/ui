import { CalendarDotsIcon } from "@phosphor-icons/react";
import type * as React from "react";
import { NativeDateField } from "#/native-date-picker/components/native-date-field.tsx";

export function NativeDateTimePicker(
	props: Omit<
		React.ComponentProps<typeof NativeDateField>,
		"type" | "slot" | "icon"
	>,
) {
	return (
		<NativeDateField
			type="datetime-local"
			slot="native-date-time-picker"
			icon={<CalendarDotsIcon />}
			{...props}
		/>
	);
}
