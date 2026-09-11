import type * as React from "react";
import { createContext, useContext } from "react";

/**
 * Where portaled parts (dialogs, popovers, menus, tooltips, toasts bars…) are
 * rendered when nothing closer says otherwise. `null` and `undefined` both mean
 * Base UI's default, `document.body`.
 */
export type PortalContainer =
	| HTMLElement
	| ShadowRoot
	| React.RefObject<HTMLElement | ShadowRoot | null>
	| null;

const PortalContainerContext = createContext<PortalContainer | undefined>(
	undefined,
);

interface Props {
	/** The element every portal below renders into. A ref works too, so the target can be a sibling that mounts in the same pass. */
	container: PortalContainer;
	children?: React.ReactNode;
}

/**
 * Sets the portal container for every overlay in the subtree. Render it once,
 * at the root of an island whose styles are scoped to an ancestor (a widget
 * inside a host page, a Shadow DOM, a preview iframe): a popup portaled to
 * `document.body` would leave that ancestor and lose its styles.
 */
export function PortalContainerProvider({ container, children }: Props) {
	return (
		<PortalContainerContext.Provider value={container}>
			{children}
		</PortalContainerContext.Provider>
	);
}

/** The container set by the nearest `PortalContainerProvider`, `undefined` without one. */
export function usePortalContainer(): PortalContainer | undefined {
	return useContext(PortalContainerContext);
}

function isRef(
	value: PortalContainer,
): value is React.RefObject<HTMLElement | ShadowRoot | null> {
	return value !== null && "current" in value;
}

/**
 * The concrete node for the current container, for portals that take an
 * element rather than a ref (`createPortal`, vaul). `null` means the default.
 */
export function usePortalContainerNode(): HTMLElement | ShadowRoot | null {
	const container = usePortalContainer();
	if (container === undefined || container === null) {
		return null;
	}
	return isRef(container) ? container.current : container;
}
