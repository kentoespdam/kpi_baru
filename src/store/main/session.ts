import { create } from "zustand";

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

export const useSessionStore = create<SessionStore>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
