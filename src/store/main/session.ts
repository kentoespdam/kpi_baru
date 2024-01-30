import { UserRole } from "@tipes/index";
import { Account } from "appwrite";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface AccountPref {
	roles?: UserRole[];
}

export interface SessionUser {
	$id: string;
	name: string;
	email: string;
	prefs: AccountPref;
}

interface SessionStore {
	account: string | null;
	setAccount: (account: Account | null) => void;
	_hasHydrated: boolean;
	setHasHydrated: (state: boolean) => void;
}

export const useSessionStore = create(
	devtools(
		persist<SessionStore>(
			(set, get) => ({
				account: null,
				setAccount: (account) => set({ account: JSON.stringify(account) }),
				_hasHydrated: false,
				setHasHydrated: (state) => {
					set({
						_hasHydrated: state,
					});
				},
			}),
			{
				name: "session",
				storage: createJSONStorage(() => sessionStorage),
				onRehydrateStorage: (state) => {
					state.setHasHydrated(true);
					console.log("hydration starts");

					// optional
					return (state, error) => {
						if (error) {
							console.log("an error happened during hydration", error);
						} else {
							console.log("hydration finished");
						}
					};
				},
			},
		),
	),
);
