import { cn } from "#/lib/utils.ts";
import type { TranslationValue } from "#/translation-input/components/translation-input-value.ts";

/**
 * The trailing locale switcher. Locales that hold nothing yet are marked with
 * a bullet, so a partially translated value is visible without opening each
 * language in turn.
 */
export function TranslationInputLocaleSelect({
	value,
	locale,
	locales,
	onLocaleChange,
	localeLabel,
	localeCodes,
}: {
	value: TranslationValue;
	locale: string;
	locales: ReadonlyArray<string>;
	onLocaleChange: (locale: string) => void;
	localeLabel: string;
	localeCodes?: Record<string, string>;
}) {
	return (
		<select
			data-slot="translation-input-locale"
			aria-label={localeLabel}
			value={locale}
			onChange={(event) => onLocaleChange(event.target.value)}
			className={cn(
				"cursor-pointer appearance-none bg-transparent pr-1 text-sm font-medium text-muted-foreground outline-none",
			)}
		>
			{locales.map((tag) => {
				const filled = (value[tag] ?? "").trim().length > 0;
				const code = localeCodes?.[tag] ?? tag;
				// The bullet flags a locale with nothing in it yet; `<option>`
				// cannot host markup, so the status rides in the text.
				return (
					<option key={tag} value={tag}>
						{filled ? code : `• ${code}`}
					</option>
				);
			})}
		</select>
	);
}
