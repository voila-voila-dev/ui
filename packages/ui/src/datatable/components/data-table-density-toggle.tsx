import { RowsIcon } from "@phosphor-icons/react";
import { Button } from "#/button/components/button.tsx";
import type { DataTableDensity } from "#/datatable/libs/density.ts";
import { DropdownMenu } from "#/dropdown-menu/components/dropdown-menu.tsx";

interface Props {
	density: DataTableDensity;
	onDensityChange: (density: DataTableDensity) => void;
	label?: string;
	labels?: Record<DataTableDensity, string>;
	className?: string;
}

/** Row-height switch, for tables people scan rather than read. */
export function DataTableDensityToggle({
	density,
	onDensityChange,
	label = "Density",
	labels = { comfortable: "Comfortable", compact: "Compact" },
	className,
}: Props) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				render={
					<Button variant="outline" size="sm" className={className}>
						<RowsIcon />
						{label}
					</Button>
				}
			/>
			<DropdownMenu.Content align="end">
				<DropdownMenu.RadioGroup
					value={density}
					onValueChange={(value) => onDensityChange(value as DataTableDensity)}
				>
					<DropdownMenu.RadioItem value="comfortable">
						{labels.comfortable}
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="compact">
						{labels.compact}
					</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
