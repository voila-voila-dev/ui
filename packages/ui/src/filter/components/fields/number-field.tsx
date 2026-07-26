import { InputGroup } from "#/input-group/components/input-group.tsx";

interface Props {
	readonly id?: string;
	readonly value: string;
	readonly onChange: (raw: string) => void;
	readonly unit?: string;
	readonly placeholder?: string;
	readonly min?: number;
	readonly max?: number;
	readonly step?: number;
}

export function NumberField({
	id,
	value,
	onChange,
	unit,
	placeholder,
	min,
	max,
	step,
}: Props) {
	return (
		<InputGroup.Root>
			<InputGroup.Input
				id={id}
				type="number"
				inputMode="decimal"
				value={value}
				placeholder={placeholder}
				min={min}
				max={max}
				step={step}
				onChange={(event) => onChange(event.target.value)}
			/>
			{unit !== undefined && (
				<InputGroup.Addon align="inline-end">{unit}</InputGroup.Addon>
			)}
		</InputGroup.Root>
	);
}
