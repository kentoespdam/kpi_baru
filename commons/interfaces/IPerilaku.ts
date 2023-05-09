import {
	EAuditStatus,
	IApiResponse,
	IAudit,
	IBaseId,
	IPageRequest,
	IPages,
	SelectType,
} from "./ICommons";

export const LOCAL_PERILAKU = "/api/master/perilaku";
export const REMOTE_PERILAKU = `${process.env.NEXT_API}/master/perilaku`;

export interface IPerilaku extends IBaseId {
	urut: number;
	kompetensi: string;
	uraian: string;
}

export const isPerilaku = (obj: any): obj is IPerilaku => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.urut === "number" &&
		typeof obj.kompetensi === "string" &&
		typeof obj.uraian === "string"
	);
};

export const perilakuFilterType: SelectType[] = [
	{ id: "kompetensi", label: "Kompetensi", type: "string" },
	{ id: "uraian", label: "Uraian", type: "string" },
	{ id: "status", label: "Status", type: "eAuditStatus" },
];

export interface IPerilakuWithAudit extends IPerilaku, IAudit {}

export interface IPerilakuForm {
	id?: number;
	urut?: number;
	kompetensi?: string;
	uraian?: string;
	status?: EAuditStatus;
}

export interface IPerilakuRequest {
	kompetensi?: string;
	uraian?: string;
	status?: EAuditStatus;
}

export interface IPagePerilakuRequest extends IPageRequest, IPerilakuRequest {}

export interface IPerilakuResponse extends IApiResponse<IPerilaku> {}

export interface IPagePerilakuResponse
	extends IApiResponse<IPages<IPerilakuWithAudit>> {}
