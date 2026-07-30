import { CaretDownIcon } from "@phosphor-icons/react";
import { Button } from "@voila.dev/ui/button";
import { Collapsible } from "@voila.dev/ui/collapsible";

export function Default() {
	return (
		<Collapsible.Root className="flex w-full max-w-80 flex-col gap-2">
			<div className="flex items-center justify-between gap-4 px-1">
				<h4 className="font-medium text-sm">
					3 freelancers applied to this project
				</h4>
				<Collapsible.Trigger
					render={<Button variant="ghost" size="icon-sm" />}
					className="group/collapsible-trigger"
					aria-label="Toggle proposals"
				>
					<CaretDownIcon className="transition-transform duration-200 group-aria-expanded/collapsible-trigger:rotate-180 motion-reduce:transition-none" />
				</Collapsible.Trigger>
			</div>
			<Collapsible.Content className="flex flex-col gap-2">
				{["Nathan Guyot", "Marie Lefevre", "Paul Martin"].map((name) => (
					<div key={name} className="rounded-md border px-3 py-2 text-sm">
						{name}
					</div>
				))}
			</Collapsible.Content>
		</Collapsible.Root>
	);
}
