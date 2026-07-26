import type { DateTimeRange } from "#/date-time-picker/components/date-time-range.ts";
import {
	endLabelText,
	type ShiftStep,
	shiftStepLabel,
	startLabelText,
} from "#/date-time-picker/components/shift-time-range.ts";

/** One of the two step tabs: a heading over the side's current datetime summary. */
function StepTab({
	active,
	heading,
	value,
	onClick,
}: {
	active: boolean;
	heading: string;
	value: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			data-active={active || undefined}
			onClick={onClick}
			className="flex flex-col items-start gap-0.5 rounded-md border border-transparent px-2.5 py-1.5 text-left transition-colors hover:bg-accent data-active:border-input data-active:bg-accent"
		>
			<span className="text-xs font-medium text-muted-foreground">
				{heading}
			</span>
			<span className="line-clamp-1 text-sm">{value}</span>
		</button>
	);
}

/** The Start/End switch above the picker, each side showing its current summary. */
export function ShiftStepTabs({
	step,
	range,
	locale,
	onStepChange,
}: {
	step: ShiftStep;
	range: DateTimeRange;
	locale: string | undefined;
	onStepChange: (step: ShiftStep) => void;
}) {
	return (
		<div className="grid grid-cols-2 gap-1.5 border-b p-1.5">
			<StepTab
				active={step === "start"}
				heading={startLabelText(locale)}
				value={shiftStepLabel(range.start, locale)}
				onClick={() => onStepChange("start")}
			/>
			<StepTab
				active={step === "end"}
				heading={endLabelText(locale)}
				value={shiftStepLabel(range.end, locale)}
				onClick={() => onStepChange("end")}
			/>
		</div>
	);
}
