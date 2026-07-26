import type * as React from "react";
import { Select } from "#/select/components/select.tsx";

export function ResponsiveSelectContent(
	props: React.ComponentProps<typeof Select.Content>,
) {
	return <Select.Content {...props} />;
}
