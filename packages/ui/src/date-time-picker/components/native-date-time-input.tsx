import type * as React from "react";
import {
	parseLocalInputValue,
	toLocalInputValue,
} from "#/date-time-picker/components/date-time-values.ts";
import { NativeDateTimePicker } from "#/native-date-picker/components/native-date-time-picker.tsx";

type NativeDateTimePickerProps = React.ComponentProps<
	typeof NativeDateTimePicker
>;

export type NativeDateTimeInputProps = Omit<
	NativeDateTimePickerProps,
	"value" | "defaultValue" | "onChange"
> & {
	value?: Date | null;
	onValueChange?: (date: Date | null) => void;
};

/**
 * `Date`-valued adapter over the native `<input type="datetime-local">`, so the
 * mobile surface shares the picker family's value model. The native field uses the
 * viewer's local clock, matching {@link DateTimePicker}.
 */
export function NativeDateTimeInput({
	value,
	onValueChange,
	...props
}: NativeDateTimeInputProps) {
	return (
		<NativeDateTimePicker
			value={value ? toLocalInputValue(value) : ""}
			onChange={(event) =>
				onValueChange?.(parseLocalInputValue(event.target.value))
			}
			{...props}
		/>
	);
}
