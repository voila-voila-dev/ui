import { ClockIcon } from "@phosphor-icons/react";
import {
	NativeDateField,
	type NativeDateFieldProps,
} from "#/native-date-picker/components/native-date-field.tsx";

export function NativeTimePicker(props: NativeDateFieldProps) {
	return (
		<NativeDateField
			type="time"
			slot="native-time-picker"
			icon={<ClockIcon />}
			{...props}
		/>
	);
}
