import type * as React from "react";
import type { ButtonProps } from "#/button/components/button.tsx";
import type { Calendar } from "#/calendar/components/calendar.tsx";

/** The value and field props every datetime surface in this family accepts. */
export type DateTimeSharedProps = {
	/** Controlled value; pass `null` for a controlled empty selection. */
	value?: Date | null;
	defaultValue?: Date;
	onValueChange?: (date: Date | null) => void;
	placeholder?: string;
	/** BCP-47 locale (e.g. "fr-FR"), applied to the trigger label, calendar, and time labels. */
	locale?: string;
	disabled?: boolean;
	/** Name for a hidden form input; the value is serialized as `yyyy-MM-ddTHH:mm`. */
	name?: string;
	id?: string;
	className?: string;
	"aria-invalid"?: React.AriaAttributes["aria-invalid"];
	"aria-label"?: string;
	/** Minutes between two options in the time list. Defaults to 30. */
	minuteStep?: number;
};

export type DateTimePickerProps = DateTimeSharedProps & {
	/**
	 * `Intl.DateTimeFormat` options for the trigger label. Defaults to
	 * `{ dateStyle: "medium", timeStyle: "short" }` (e.g. "Jun 20, 2026, 2:30 PM").
	 */
	formatOptions?: Intl.DateTimeFormatOptions;
	variant?: ButtonProps["variant"];
	/** Escape hatch for the underlying Calendar (disabled days, week numbers…). */
	calendarProps?: Omit<
		React.ComponentProps<typeof Calendar.Root>,
		"mode" | "selected" | "onSelect" | "locale"
	>;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};
