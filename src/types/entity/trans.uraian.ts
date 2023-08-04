import { BaseId } from "..";
import { TransFile } from "./trans.file";

export const LOCAL_TRANS_URAIAN = "/api/trans/uraian";
export const REMOTE_TRANS_URAIAN = `${process.env.KPI_API}/transaction/kpi-uraian`;

export interface TransUraian extends BaseId {
	uraian: string;
	volume: number;
	satuan: string;
	waktu: string;
	capaianVolume: number;
	capaianSatuan: string;
	capaianWaktu: string;
	nilaiProdukKerja: number;
	nilaiWaktu: number;
	nilaiTotalUraian: number;
	target: "MIN" | "MAX";
	bobot: number;
	fileList: TransFile[];
}

export interface TransUraianData extends BaseId {
	capaianVolume: number;
	capaianSatuan: string;
	capaianWaktu: string;
	nilaiProdukKerja: number;
	nilaiWaktu: number;
	nilaiTotalUraian: number;
}
