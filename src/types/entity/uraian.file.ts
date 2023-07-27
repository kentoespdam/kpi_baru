import { BaseId } from "..";

export const LOCAL_URAIAN_FILE = "/api/trans/kpi/staff/file";
export const REMOTE_URAIAN_FILE = `${process.env.KPI_API}/transaction/kpi-uraian-file`;

export interface UraianFile extends BaseId {
	fileName: string;
	fileType: string;
}

export interface UraianFileData {
	periode: number;
	nipam: string;
	transKpiUraianId: number;
	file: File;
}
