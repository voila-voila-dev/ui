import type * as React from "react";
import { Select } from "#/select/components/select.tsx";

export function ResponsiveSelectItem(
	props: React.ComponentProps<typeof Select.Item>,
) {
	return <Select.Item {...props} />;
}
