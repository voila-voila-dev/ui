import { useEditorRef, useEditorSelector } from "platejs/react";
import { useState } from "react";
import { Button } from "#/button/components/button.tsx";
import { useContentEditorConfig } from "#/content-editor/context/content-editor-context.tsx";
import type { ContentToolbarItem } from "#/content-editor/features/feature-definition.tsx";
import { Kbd } from "#/kbd/components/kbd.tsx";
import { Popover } from "#/popover/components/popover.tsx";
import { Toggle } from "#/toggle/components/toggle.tsx";
import { Tooltip } from "#/tooltip/components/tooltip.tsx";

interface Props {
	item: ContentToolbarItem;
	/** Smaller chrome for the floating toolbar. */
	size?: "default" | "sm";
}

/**
 * One registry item as a control: a Toggle when the item knows whether it
 * is active, a Button otherwise, a Popover trigger when it opens a form.
 * `onMouseDown` is swallowed so the editor keeps its selection while the
 * control is pressed.
 */
export function ContentEditorToolbarItem({ item, size = "default" }: Props) {
	const editor = useEditorRef();
	const { labels, uploadImage, readOnly } = useContentEditorConfig();
	const [open, setOpen] = useState(false);
	const state = useEditorSelector(
		(current) => ({
			active: item.isActive?.(current) ?? false,
			disabled: readOnly || (item.isDisabled?.(current) ?? false),
			visible: item.isVisible?.(current) ?? true,
		}),
		[item, readOnly],
	);
	if (!state.visible) {
		return null;
	}
	const label = labels.items[item.label] ?? item.label;
	const Icon = item.icon;
	const control =
		item.isActive !== undefined ? (
			<Toggle
				aria-label={label}
				size={size === "sm" ? "sm" : "default"}
				pressed={state.active}
				disabled={state.disabled}
				onMouseDown={(event) => event.preventDefault()}
				onPressedChange={() => {
					if (item.Popover === undefined) {
						item.run(editor, { labels, uploadImage });
					}
				}}
			>
				<Icon />
			</Toggle>
		) : (
			<Button
				variant="ghost"
				size={size === "sm" ? "icon-xs" : "icon-sm"}
				aria-label={label}
				disabled={state.disabled}
				onMouseDown={(event) => event.preventDefault()}
				onClick={() => {
					if (item.Popover === undefined) {
						item.run(editor, { labels, uploadImage });
					}
				}}
			>
				<Icon />
			</Button>
		);
	const withTooltip = (
		<Tooltip.Root>
			<Tooltip.Trigger render={control} />
			<Tooltip.Content>
				{label}
				{item.kbd ? (
					<Kbd.Group>
						{item.kbd.map((key) => (
							<Kbd.Root key={key} size="sm">
								{key}
							</Kbd.Root>
						))}
					</Kbd.Group>
				) : null}
			</Tooltip.Content>
		</Tooltip.Root>
	);
	if (item.Popover === undefined) {
		return withTooltip;
	}
	const Form = item.Popover;
	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Trigger render={withTooltip} nativeButton={false} />
			<Popover.Content
				side="bottom"
				align="start"
				className="w-[min(18rem,calc(100vw-2rem))] p-3"
			>
				{open ? <Form onClose={() => setOpen(false)} /> : null}
			</Popover.Content>
		</Popover.Root>
	);
}
