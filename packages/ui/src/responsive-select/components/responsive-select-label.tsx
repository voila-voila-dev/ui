import type * as React from "react";
import { Select } from "#/select/components/select.tsx";

export function ResponsiveSelectLabel(
	props: React.ComponentProps<typeof Select.Label>,
) {
	return <Select.Label {...props} />;
}
