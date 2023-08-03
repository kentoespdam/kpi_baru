import { BaseId } from "..";
import { TransFile } from "./trans.file";

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
