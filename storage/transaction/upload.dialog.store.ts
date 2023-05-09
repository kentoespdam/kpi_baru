import { IUraianFile } from "@interfaces/IUraianFile";
import { create } from "zustand";

interface UploadDialogStore {
	title: string;
	formUpload: boolean;
	isUploadOpen: boolean;
	transKpiUraianId?: number;
	toggleUpload: (v?: string, f?: boolean, transKpiUraianId?: number) => void;
	fileList: IUraianFile[] | [];
	setFileList: (v: IUraianFile[]) => void;
}

export const useUploadDialogStore = create<UploadDialogStore>((set) => ({
	title: "",
	formUpload: false,
	isUploadOpen: false,
	toggleUpload: (value?, f?, i?) =>
		set((state) => ({
			...state,
			title: value ? value : "",
			formUpload: f ? true : false,
			// transKpiUraianId: i ? i : state.transKpiUraianId,
			transKpiUraianId: i,
			isUploadOpen: !state.isUploadOpen,
		})),
	fileList: [],
	setFileList: (value) =>
		set((state) => ({
			...state,
			fileList: value,
		})),
}));
