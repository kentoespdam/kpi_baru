import { UserRole } from "@myTypes/index";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface AccountPref {
	roles?: UserRole[];
}

export interface SessionUser {
	$id: string;
	userId: string;
	name: string;
	email: string;
	prefs: AccountPref;
}

interface SessionStore {
	user: SessionUser | null;
	setUser: (user: SessionUser | null) => void;
}

export const useSessionStore = create(
	devtools(
		persist<SessionStore>(
			(set, get) => ({
				user: null,
				setUser: (user) => set({ user }),
			}),
			{
				name: "session",
				storage: createJSONStorage(() => sessionStorage),
			}
		)
	)
);
