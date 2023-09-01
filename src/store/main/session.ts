import { UserRole } from "@myTypes/index";
import axios from "axios";
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

const getSessionAccount = async () => {
	console.log("hemmmmm");
	try {
		const { status, data } = await axios.get("/api/session");
		if (status !== 200) return null;
		console.log(data);
		return data;
	} catch (e: any) {
		console.log(
			"store.main.session",
			new Date().toISOString(),
			e.response.data.message
		);
		return null;
	}
};
