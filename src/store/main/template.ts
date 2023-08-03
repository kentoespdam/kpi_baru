import { create } from "zustand";

interface TemplateStore {
	isDesktop: boolean;
	setDesktop: (isDesktop: boolean) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
	isDesktop: false,
	setDesktop: (isDesktop) => set({ isDesktop }),
}));
