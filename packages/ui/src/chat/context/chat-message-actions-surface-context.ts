import * as React from "react";

interface ChatMessageActionsSurfaceValue {
	/** Closes the long-press surface once the tapped action has run. */
	close: () => void;
}

/**
 * Set while `Chat.MessageAction` renders inside the long-press surface, where
 * there is no menu to host a menu item — the action renders as a plain button
 * instead, so callers compose one `actions` tree for both hosts.
 */
export const ChatMessageActionsSurfaceContext =
	React.createContext<ChatMessageActionsSurfaceValue | null>(null);
