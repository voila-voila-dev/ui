import { toIsoDay } from "#/date-picker/components/date-picker-format.ts";

/** The hidden form input serializing a day as yyyy-MM-dd (none without a name). */
export function DatePickerHiddenInput({
	name,
	date,
}: {
	name?: string;
	date: Date | null | undefined;
}) {
	if (!name) return null;
	return <input type="hidden" name={name} value={date ? toIsoDay(date) : ""} />;
}
