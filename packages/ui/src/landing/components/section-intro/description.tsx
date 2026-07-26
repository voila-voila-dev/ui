import { Text } from "#/landing/components/text.tsx";

interface Props extends React.ComponentProps<typeof Text> {}

export function SectionIntroDescription(props: Props) {
	return <Text variant="lead" align="center" {...props} />;
}
