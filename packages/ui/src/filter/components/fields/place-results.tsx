import { MapPinIcon, SpinnerGapIcon } from "@phosphor-icons/react";
import type { FilterLabels, PlaceSuggestion } from "#/filter/types.ts";

interface Props {
	readonly results: ReadonlyArray<PlaceSuggestion>;
	readonly busy: boolean;
	readonly query: string;
	readonly labels: FilterLabels;
	readonly onPick: (place: PlaceSuggestion) => void;
}

export function PlaceResults({ results, busy, query, labels, onPick }: Props) {
	if (busy) {
		return (
			<p className="flex items-center gap-2 text-muted-foreground text-sm">
				<SpinnerGapIcon className="size-4 animate-spin" />
				{labels.search}
			</p>
		);
	}
	if (query.trim().length >= 2 && results.length === 0) {
		return (
			<p className="text-muted-foreground text-sm">{labels.placeNoResults}</p>
		);
	}
	return (
		<ul className="flex flex-col gap-1">
			{results.map((place) => (
				<li key={place.id}>
					<button
						type="button"
						onClick={() => onPick(place)}
						className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
					>
						<MapPinIcon className="size-4 shrink-0 text-muted-foreground" />
						<span className="truncate">{place.label}</span>
					</button>
				</li>
			))}
		</ul>
	);
}
