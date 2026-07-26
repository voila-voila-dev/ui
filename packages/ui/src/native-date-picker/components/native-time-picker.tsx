import { ClockIcon } from "@phosphor-icons/react";
import type * as React from "react";
import { NativeDateField } from "#/native-date-picker/components/native-date-field.tsx";

export function NativeTimePicker(
	props: Omit<
		React.ComponentProps<typeof NativeDateField>,
		"type" | "slot" | "icon"
	>,
) {
	return (
		<NativeDateField
			type="time"
			slot="native-time-picker"
			icon={<ClockIcon />}
			{...props}
		/>
	);
}
