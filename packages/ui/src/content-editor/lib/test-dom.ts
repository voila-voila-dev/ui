/**
 * What jsdom lacks and Slate asks for. Called from `beforeEach` in a test
 * that mounts the editor; assert against `editor.children`, never against
 * caret pixels, since the rects below are constants.
 */
export function installContentEditorTestDom(): void {
	window.matchMedia = ((query: string) =>
		({
			matches: false,
			media: query,
			addEventListener: () => {},
			removeEventListener: () => {},
		}) as unknown as MediaQueryList) as typeof window.matchMedia;
	const rect = () =>
		({
			x: 0,
			y: 0,
			width: 10,
			height: 10,
			top: 0,
			left: 0,
			right: 10,
			bottom: 10,
			toJSON: () => ({}),
		}) as DOMRect;
	Range.prototype.getBoundingClientRect = rect;
	Range.prototype.getClientRects = () =>
		({
			length: 1,
			item: () => rect(),
			[Symbol.iterator]: function* () {
				yield rect();
			},
		}) as unknown as DOMRectList;
	Element.prototype.scrollIntoView = () => {};
}
