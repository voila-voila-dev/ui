import { SectionIntroDescription } from "#/landing/components/section-intro/description.tsx";
import { SectionIntroRoot } from "#/landing/components/section-intro/root.tsx";
import { SectionIntroTitle } from "#/landing/components/section-intro/title.tsx";

export type { SectionIntroVariants } from "#/landing/components/section-intro-variants.ts";
export {
	sectionIntroSpacingOptions,
	sectionIntroWidthOptions,
} from "#/landing/components/section-intro-variants.ts";

/** Compose: `Root > Title + Description`. */
export const SectionIntro = {
	Root: SectionIntroRoot,
	Title: SectionIntroTitle,
	Description: SectionIntroDescription,
};
