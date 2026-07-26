import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";
import type { SortableBlockHandle } from "#/email-block-editor/dnd/sortable-block-list.tsx";

interface Props {
	blockId: string;
	className?: string;
	children: (handle: SortableBlockHandle) => ReactNode;
}

/** One draggable row; renders its content through a render prop that receives
 * the drag handle to attach to the block toolbar. */
export function SortableBlockItem({ blockId, className, children }: Props) {
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: blockId });

	return (
		<div
			ref={setNodeRef}
			className={className}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				...(isDragging && { opacity: 0.6, zIndex: 1, position: "relative" }),
			}}
		>
			{children({ attributes, listeners, setActivatorNodeRef, isDragging })}
		</div>
	);
}
