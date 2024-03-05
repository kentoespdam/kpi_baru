import { User } from "@store/types";
import { cryptr } from "@utils/index";
import { create } from "zustand";

interface SessionStore {
	user: string | null;
	setUser: (user: User | null) => void;
	getUser: () => User | null;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
	user: null,
	setUser: (user) => set({ user: cryptr.encrypt(JSON.stringify(user)) }),
	getUser: () => {
		const usr = get().user;
		if (!usr) return null;
		return JSON.parse(cryptr.decrypt(usr));
	},
}));
