import { useCallback, useState } from "react";

/**
 * Remembers which sidebar sections the reader has opened.
 *
 * The docs layout remounts on every navigation, so a `defaultOpen` on the
 * Collapsible is re-evaluated each time: open `@voila.dev/ui`, click a
 * component, and the group you were reading collapses again. That made the
 * sidebar close under you exactly when you were working through a section.
 *
 * The store is a module-level `Map` rather than component state or
 * `sessionStorage`. A module outlives the remount, which is the whole problem,
 * and it needs no effect to read — so the first client render matches the
 * prerendered HTML and there is no hydration mismatch and no flicker. A full
 * page load starts from the defaults again, which is the right default: you
 * arrived somewhere new.
 */
const openState = new Map<string, boolean>();

export function useSidebarOpenState(
	key: string,
	fallback: boolean,
): [boolean, (open: boolean) => void] {
	const [open, setLocal] = useState(() => openState.get(key) ?? fallback);

	const setOpen = useCallback(
		(next: boolean) => {
			openState.set(key, next);
			setLocal(next);
		},
		[key],
	);

	return [open, setOpen];
}
