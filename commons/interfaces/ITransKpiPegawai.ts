import { EAuditStatus } from "./ICommons";
import { IIndikator } from "./IIndikator";
import { IProfesi } from "./IProfesi";
import { IUraianFile } from "./IUraianFile";
import { IUraianIndikator } from "./IUraianIndikator";

export const LOCAL_TRANS_KPI_PEGAWAI = "/api/trans/kpi-pegawai";
export const REMOTE_TRANS_KPI_PEGAWAI = `${process.env.NEXT_API}/transaction/kpi`;
export const LOCAL_TRANS_KPI_URAIAN = "/api/trans/kpi-uraian";
export const REMOTE_TRANS_KPI_URAIAN = `${process.env.NEXT_API}/transaction/kpi-uraian`;

export interface ITransKpiPegawai {
	id: number;
	nipam: string;
	organizationId: number;
	positionId: number;
	profesi: IProfesi;
	periode: string;
	name: string;
	nilaiTotal: number;
	indikatorList: IKpiIndikator[];
}

export interface IKpiIndikator extends IIndikator {
	uraianList: IKpiUraian[];
}

export interface IKpiUraian extends IUraianIndikator {
	capaianVolume: number;
	capaianSatuan: string;
	capaianWaktu: string;
	nilaiProdukKerja: number;
	nilaiWaktu: number;
	nilaiTotalUraian: number;
	fileList: IUraianFile[];
}

export interface ITransKpiPegawaiPost {
	id: number;
	nilaiTotal: number;
	status: EAuditStatus;
}

export interface IKpiUraianPost {
	id: number;
	capaianVolume: number;
	capaianSatuan: string;
	capaianWaktu?: string | null;
	nilaiProdukKerja: number;
	nilaiWaktu: number;
	nilaiTotalUraian: number;
	status: EAuditStatus;
}
