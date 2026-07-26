import type { DateRange } from "react-day-picker";
import { DatePickerHiddenInput } from "#/date-picker/components/date-picker-hidden-input.tsx";

/** The `${name}-from` / `${name}-to` pair a range serializes to in a form. */
export function DateRangePickerHiddenInputs({
	name,
	value,
}: {
	name?: string;
	value: DateRange | null | undefined;
}) {
	if (!name) {
		return null;
	}
	return (
		<>
			<DatePickerHiddenInput name={`${name}-from`} date={value?.from} />
			<DatePickerHiddenInput name={`${name}-to`} date={value?.to} />
		</>
	);
}
