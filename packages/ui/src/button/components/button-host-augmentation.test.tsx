// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "#/button/components/button.tsx";
import { Pagination } from "#/pagination/components/pagination.tsx";

// Mirrors what @shopify/app-bridge-types declares for every embedded app: a
// `variant` on native buttons and anchors that has nothing to do with ours.
declare module "react" {
	interface ButtonHTMLAttributes<T> {
		variant?: "primary" | "breadcrumb" | null | undefined;
	}
	interface AnchorHTMLAttributes<T> {
		variant?: "primary" | "breadcrumb" | null | undefined;
	}
}

afterEach(cleanup);

describe("Button under a host augmentation", () => {
	it("still accepts every kit variant", () => {
		const screen = render(
			<>
				<Button variant="outline">Book</Button>
				<Button variant="ghost" size="sm">
					Skip
				</Button>
				<Pagination.Root>
					<Pagination.Content>
						<Pagination.Item>
							<Pagination.Link href="#" variant="outline">
								2
							</Pagination.Link>
						</Pagination.Item>
					</Pagination.Content>
				</Pagination.Root>
			</>,
		);
		expect(screen.getByRole("button", { name: "Book" }).dataset.variant).toBe(
			"outline",
		);
		expect(screen.getByText("2").dataset.variant).toBe("outline");
	});
});
