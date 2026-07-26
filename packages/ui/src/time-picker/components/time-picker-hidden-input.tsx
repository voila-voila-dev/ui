export function HiddenTimeInput({
	name,
	value,
}: {
	name: string | undefined;
	value: string | null | undefined;
}) {
	if (!name) return null;
	return <input type="hidden" name={name} value={value ?? ""} />;
}
