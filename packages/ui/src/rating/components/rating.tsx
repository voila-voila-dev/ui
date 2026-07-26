import { RatingInput } from "#/rating/components/rating-input.tsx";
import { RatingRoot } from "#/rating/components/rating-root.tsx";

/**
 * The Rating parts as one namespace.
 */
export const Rating = {
	Root: RatingRoot,
	Input: RatingInput,
};

export type { RatingSize } from "#/rating/components/rating-stars.ts";
export { ReviewItem } from "#/rating/components/review-item.tsx";
