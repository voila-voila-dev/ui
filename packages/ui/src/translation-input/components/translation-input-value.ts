/** A value carrying one string per locale, keyed by locale tag. */
export type TranslationValue = Record<string, string>;

export const isBlank = (text: string | undefined): boolean =>
	(text ?? "").trim().length === 0;

/**
 * Writes `text` to `locale`, carrying it into every locale that is still blank
 * so a value written once is complete. Locales that already hold their own
 * wording are left alone - this only ever fills gaps, never overwrites a
 * translation.
 */
export function writeLocale(
	value: TranslationValue,
	locales: ReadonlyArray<string>,
	locale: string,
	text: string,
): TranslationValue {
	const next: TranslationValue = { ...value, [locale]: text };
	for (const tag of locales) {
		if (tag !== locale && isBlank(value[tag])) {
			next[tag] = text;
		}
	}
	return next;
}
