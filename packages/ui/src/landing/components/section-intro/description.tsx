import { Text } from "#/landing/components/text.tsx";

type Props = React.ComponentProps<typeof Text>;

export function SectionIntroDescription(props: Props) {
	return <Text variant="lead" align="center" {...props} />;
}
