import { Button } from "@voila.dev/ui/button";
import { Dialog } from "@voila.dev/ui/dialog";
import { PortalContainerProvider } from "@voila.dev/ui/portal-container";
import { Tooltip } from "@voila.dev/ui/tooltip";
import { useRef } from "react";

export function Default() {
	const island = useRef<HTMLDivElement | null>(null);
	return (
		<div ref={island} className="rounded-lg border border-dashed p-6">
			<PortalContainerProvider container={island}>
				<div className="flex items-center gap-3">
					<Dialog.Root>
						<Dialog.Trigger render={<Button variant="outline" />}>
							Invite a freelancer
						</Dialog.Trigger>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Invite a freelancer</Dialog.Title>
								<Dialog.Description>
									This dialog is rendered inside the dashed box, not under the
									document body.
								</Dialog.Description>
							</Dialog.Header>
							<Dialog.Footer closeLabel="Close" />
						</Dialog.Content>
					</Dialog.Root>
					<Tooltip.Root>
						<Tooltip.Trigger render={<Button variant="ghost" />}>
							Hover me
						</Tooltip.Trigger>
						<Tooltip.Content>Same container for tooltips</Tooltip.Content>
					</Tooltip.Root>
				</div>
			</PortalContainerProvider>
		</div>
	);
}
