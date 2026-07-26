import type { EmailBlockComponentProps } from "#/email-block-editor/blocks/block-definitions.tsx";
import type { EmailEditorArticleBlock } from "#/email-block-editor/document/types.ts";
import { BlockOptionSection } from "#/email-block-editor/sections/block-options/block-option-section.tsx";
import { LinkOption } from "#/email-block-editor/sections/block-options/link-option.tsx";
import { TextAreaOption } from "#/email-block-editor/sections/block-options/text-area-option.tsx";
import { TextOption } from "#/email-block-editor/sections/block-options/text-option.tsx";

interface Props extends EmailBlockComponentProps<EmailEditorArticleBlock> {}

export function ArticleBlockSettings({ block, onChange }: Props) {
	return (
		<>
			<BlockOptionSection title="Content">
				<TextOption
					label="Title"
					value={block.title}
					onChange={(title) => onChange({ ...block, title })}
				/>
				<TextAreaOption
					label="Summary"
					value={block.description}
					onChange={(description) => onChange({ ...block, description })}
				/>
				<TextOption
					label="Author"
					value={block.author}
					onChange={(author) => onChange({ ...block, author })}
				/>
				<TextOption
					label="Publication date"
					value={block.publishDate}
					onChange={(publishDate) => onChange({ ...block, publishDate })}
					placeholder="2026-07-20"
					description="YYYY-MM-DD format; the date is written in the recipient's language at send time."
				/>
			</BlockOptionSection>
			<BlockOptionSection title="Appearance">
				<TextOption
					label="Image URL"
					value={block.image.src}
					onChange={(src) =>
						onChange({ ...block, image: { ...block.image, src } })
					}
					placeholder="https://"
				/>
				<TextOption
					label="Alt text"
					value={block.image.alt}
					onChange={(alt) =>
						onChange({ ...block, image: { ...block.image, alt } })
					}
				/>
			</BlockOptionSection>
			<BlockOptionSection title="Link">
				<LinkOption
					value={block.href}
					onChange={(href) => onChange({ ...block, href })}
					description="The whole card links to this address."
				/>
			</BlockOptionSection>
		</>
	);
}
