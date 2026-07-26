import type * as React from "react";
import { Select } from "#/select/components/select.tsx";

export function ResponsiveSelectValue(
	props: React.ComponentProps<typeof Select.Value>,
) {
	return <Select.Value {...props} />;
}
