export const LOCAL_TRANS_PERILAKU_NILAI = "/api/trans/perilaku-nilai";
export const REMOTE_TRANS_PERILAKU_NILAI = `${process.env.NEXT_API}/transaction/perilaku-nilai`;

export interface ITransPerilakuNilai {
	id: number;
	urut: number;
	kompetensi: string;
	uraian: string;
	nilai: number;
}

export interface ITransPerilakuNilaiPost {
	id: number;
	nilai: number;
}
