import { XIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { Button } from "#/button/components/button.tsx";
import type { FilterLabels } from "#/filter/types.ts";

interface Props {
	readonly label: string;
	readonly description?: string;
	/**
	 * Ties the visible label to the control it names. Omitted by the group
	 * fields (a `<label>` would otherwise rename their first button), which name
	 * themselves through their fieldset legend.
	 */
	readonly controlId?: string;
	/** The "is / is not" switch, when the field supports exclusion. */
	readonly operator?: ReactNode;
	/** Omitted while the field is empty — nothing to clear. */
	readonly onClear?: () => void;
	readonly labels: FilterLabels;
	readonly children: ReactNode;
}

/**
 * The chrome every filter field shares: a label row that also hosts the
 * "is / is not" switch and the clear action, then the control itself. One frame
 * for all kinds is what makes a screenful of mixed filters read as one thing.
 */
export function FilterFieldFrame({
	label,
	description,
	controlId,
	operator,
	onClear,
	labels,
	children,
}: Props) {
	return (
		<div className="flex min-w-0 flex-col gap-2" data-slot="filter-field">
			{/* `min-h-9` is the clear button's height: the row reserves it whether or
			    not the button is there, so filling a field doesn't shove the one
			    below it down. */}
			<div className="flex min-h-9 flex-wrap items-center gap-x-3 gap-y-1">
				<label
					htmlFor={controlId}
					className="font-medium text-foreground text-sm"
				>
					{label}
				</label>
				{operator}
				{onClear !== undefined && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="ml-auto text-muted-foreground"
						onClick={onClear}
					>
						<XIcon />
						{labels.clear}
					</Button>
				)}
			</div>
			{description !== undefined && (
				<p className="text-muted-foreground text-xs">{description}</p>
			)}
			{children}
		</div>
	);
}
