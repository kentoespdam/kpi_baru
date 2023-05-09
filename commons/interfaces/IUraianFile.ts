import { EAuditStatus } from "./ICommons";


export const LOCAL_URAIAN_FILE = "/api/trans/uraian-file";
export const REMOTE_URAIAN_FILE = `${process.env.NEXT_API}/transaction/kpi-uraian-file`;

export interface IUraianFile {
	id: number;
	fileName: string;
	fileType: string;
	status: EAuditStatus;
}
