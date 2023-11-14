import { AcceptedStatus } from "..";

export const LOCAL_TRANS_LOCK = `/api/trans/kpi/accepted`;
export const REMOTE_TRANS_LOCK = `${process.env.KPI_API}/transaction/kpi`;

export type LockKpiData = {
	id: number;
	lockedStatus: AcceptedStatus;
};
