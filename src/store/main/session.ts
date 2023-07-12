import { create } from "zustand";
import {
	createJSONStorage,
	devtools,
	persist,
	subscribeWithSelector,
} from "zustand/middleware";

export interface SessionUser {
	$id: string;
	userId: string;
	name: string;
	email: string;
	prefs: {};
}

interface SessionStore {
	user: SessionUser | null;
	setUser: (user: SessionUser | null) => void;
}

export const useSessionStore = create(
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
);
