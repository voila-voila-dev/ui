import { CalendarDotsIcon } from "@phosphor-icons/react";
import {
	NativeDateField,
	type NativeDateFieldProps,
} from "#/native-date-picker/components/native-date-field.tsx";

export function NativeDateTimePicker(props: NativeDateFieldProps) {
	return (
		<NativeDateField
			type="datetime-local"
			slot="native-date-time-picker"
			icon={<CalendarDotsIcon />}
			{...props}
		/>
	);
}
