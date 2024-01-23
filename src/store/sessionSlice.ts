import { account } from "@lib/appwrite";
import { Account, Models } from "appwrite";
import { StateCreator, create } from "zustand";

export interface SessionStore {
	session: Models.Session | null;
	user: Models.User<Models.Preferences> | null;
	// fetchAccount: () => void;
}

export const createSessionStore: StateCreator<SessionStore> = (set) => ({
	session: null,
	user: null,
	// fetchAccount: async () => {
	// 	const user = await account.get();
	// 	set({ user: user });
	// },
});

export const useSessionStore = create<SessionStore>()((...a) => ({
	...createSessionStore(...a),
}));
