export const LOCAL_TRANS_PERILAKU_NILAI = "/api/trans/perilaku-nilai";
export const REMOTE_TRANS_PERILAKU_NILAI = `${process.env.KPI_API}/transaction/perilaku-nilai`;

export interface TransPerilakuNilai{
    id: number;
	urut: number;
	kompetensi: string;
	uraian: string;
	nilai: number;
}