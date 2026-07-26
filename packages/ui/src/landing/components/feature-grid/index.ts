import { FeatureGridCard } from "#/landing/components/feature-grid/card.tsx";
import { FeatureGridCardDescription } from "#/landing/components/feature-grid/card-description.tsx";
import { FeatureGridCardIcon } from "#/landing/components/feature-grid/card-icon.tsx";
import { FeatureGridCardTitle } from "#/landing/components/feature-grid/card-title.tsx";
import { FeatureGridRoot } from "#/landing/components/feature-grid/root.tsx";

export type {
	FeatureGridCardVariants,
	FeatureGridVariants,
} from "#/landing/components/feature-grid-variants.ts";
export {
	featureGridCardVariantOptions,
	featureGridColumnsOptions,
} from "#/landing/components/feature-grid-variants.ts";

/** Compose: `Root > Card > CardIcon + CardTitle + CardDescription`. */
export const FeatureGrid = {
	Root: FeatureGridRoot,
	Card: FeatureGridCard,
	CardIcon: FeatureGridCardIcon,
	CardTitle: FeatureGridCardTitle,
	CardDescription: FeatureGridCardDescription,
};
