interface Props {
	name: string | undefined;
	value: string | null | undefined;
}

export function HiddenTimeInput({ name, value }: Props) {
	if (!name) return null;
	return <input type="hidden" name={name} value={value ?? ""} />;
}
