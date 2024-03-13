import { create } from "zustand";

interface OrgAdminStore {
	isOrgOpen: boolean;
	toggleOrg: () => void;
	selected: string | false;
	setSelected: (selected: string | false) => void;
}

export const useOrgAdminStore = create<OrgAdminStore>()((set) => ({
	isOrgOpen: false,
	toggleOrg: () => set((state) => ({ isOrgOpen: !state.isOrgOpen })),
	selected: false,
	setSelected: (selected) => set({ selected }),
}));
