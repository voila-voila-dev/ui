import type * as React from "react";
import { Select } from "#/select/components/select.tsx";

export function ResponsiveSelectGroup(
	props: React.ComponentProps<typeof Select.Group>,
) {
	return <Select.Group {...props} />;
}
