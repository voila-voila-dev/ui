import { DatePickerRoot } from "#/date-picker/components/date-picker-root.tsx";
import { DatePickerTrigger } from "#/date-picker/components/date-picker-trigger.tsx";

export type { DateRange } from "react-day-picker";

/**
 * The DatePicker parts as one namespace.
 */
export const DatePicker = {
	Root: DatePickerRoot,
	Trigger: DatePickerTrigger,
};
