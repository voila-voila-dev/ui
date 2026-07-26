interface Props {
	active: boolean;
	heading: string;
	value: string;
	onClick: () => void;
}

/** One of the two step tabs: a heading over the side's current datetime summary. */
export function ShiftStepTab({ active, heading, value, onClick }: Props) {
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
