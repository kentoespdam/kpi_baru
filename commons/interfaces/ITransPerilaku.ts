import { ITransPerilakuNilai } from "./ITransPerilakuNilai";

export const LOCAL_TRANS_PERILAKU = "/api/trans/perilaku";
export const REMOTE_TRANS_PERILAKU = `${process.env.NEXT_API}/transaction/perilaku`;

export interface ITransPerilaku {
	id: number;
	nipam: string;
	organizationId: number;
	positionId: number;
	periode: string;
	totalNilai: number;
	perilakuList: ITransPerilakuNilai[];
}
