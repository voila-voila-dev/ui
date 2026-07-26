import type { EmailBlockComponentProps } from "#/email-block-editor/blocks/block-definitions.tsx";
import type {
	EmailEditorGridBlock,
	EmailEditorGridColumns,
	EmailEditorGridMobileColumns,
} from "#/email-block-editor/document/types.ts";
import { BlockOptionSection } from "#/email-block-editor/sections/block-options/block-option-section.tsx";
import { SegmentedOption } from "#/email-block-editor/sections/block-options/segmented-option.tsx";

const DESKTOP_COLUMN_OPTIONS: ReadonlyArray<{
	readonly value: EmailEditorGridColumns;
	readonly label: string;
}> = [
	{ value: 1, label: "1" },
	{ value: 2, label: "2" },
	{ value: 3, label: "3" },
	{ value: 4, label: "4" },
];
const MOBILE_COLUMN_OPTIONS: ReadonlyArray<{
	readonly value: EmailEditorGridMobileColumns;
	readonly label: string;
}> = [
	{ value: 1, label: "1" },
	{ value: 2, label: "2" },
];
interface Props extends EmailBlockComponentProps<EmailEditorGridBlock> {}
export function GridBlockSettings({ block, onChange }: Props) {
	return (
		<BlockOptionSection title="Appearance">
			<SegmentedOption
				label="Columns (desktop)"
				value={block.desktopColumns}
				options={DESKTOP_COLUMN_OPTIONS}
				onChange={(desktopColumns) => onChange({ ...block, desktopColumns })}
			/>
			<SegmentedOption
				label="Columns (mobile)"
				value={block.mobileColumns}
				options={MOBILE_COLUMN_OPTIONS}
				onChange={(mobileColumns) => onChange({ ...block, mobileColumns })}
				description={
					block.mobileColumns === block.desktopColumns
						? undefined
						: "A different column count on mobile relies on a media query: the Gmail app on a third-party account ignores it and falls back to one column."
				}
			/>
		</BlockOptionSection>
	);
}
