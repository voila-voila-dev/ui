import { DatePicker } from "@voila.dev/ui/date-picker";
import { useState } from "react";

export function Default() {
	const [date, setDate] = useState<Date | null>(new Date(2026, 5, 20));
	return (
		<DatePicker.Root
			value={date}
			onValueChange={setDate}
			placeholder="Project date"
			calendarProps={{ defaultMonth: new Date(2026, 5, 1) }}
		/>
	);
}
