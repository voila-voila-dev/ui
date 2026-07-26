import { EyebrowDot } from "#/landing/components/eyebrow/dot.tsx";
import { EyebrowIcon } from "#/landing/components/eyebrow/icon.tsx";
import { EyebrowLabel } from "#/landing/components/eyebrow/label.tsx";
import { EyebrowRoot } from "#/landing/components/eyebrow/root.tsx";

export type { Tone } from "#/landing/lib/tones.ts";
export { toneOptions } from "#/landing/lib/tones.ts";

/** Compose: `Root > Dot? + Icon? + Label`. */
export const Eyebrow = {
	Root: EyebrowRoot,
	Dot: EyebrowDot,
	Icon: EyebrowIcon,
	Label: EyebrowLabel,
};
