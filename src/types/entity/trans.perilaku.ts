import { BaseId } from "..";
import { TransPerilakuNilai } from "./trans.perilaku.nilai";

export const LOCAL_TRANS_PERILAKU = "/api/trans/perilaku";
export const REMOTE_TRANS_PERILAKU = `${process.env.KPI_API}/transaction/perilaku`;

export interface TransPerilaku extends BaseId{
    nipam: string;
	organizationId: number;
	positionId: number;
	periode: string;
	totalNilai: number;
	perilakuList: TransPerilakuNilai[];
}