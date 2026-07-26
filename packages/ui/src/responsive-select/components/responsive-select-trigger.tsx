import type * as React from "react";
import { Select } from "#/select/components/select.tsx";

export type ResponsiveSelectTriggerProps = React.ComponentProps<
	typeof Select.Trigger
>;

// On desktop this renders its Base UI counterpart; on mobile `Root` reads it
// instead of rendering it, so it doubles as the declaration the native
// `<select>` is built from.
export function ResponsiveSelectTrigger(props: ResponsiveSelectTriggerProps) {
	return <Select.Trigger {...props} />;
}
