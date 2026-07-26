import { CalendarBlankIcon } from "@phosphor-icons/react";
import {
	NativeDateField,
	type NativeDateFieldProps,
} from "#/native-date-picker/components/native-date-field.tsx";

export function NativeDatePicker(props: NativeDateFieldProps) {
	return (
		<NativeDateField
			type="date"
			slot="native-date-picker"
			icon={<CalendarBlankIcon />}
			{...props}
		/>
	);
}
