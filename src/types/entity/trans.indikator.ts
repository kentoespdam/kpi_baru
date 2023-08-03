import { Indikator } from "./indikator";
import { TransUraian } from "./trans.uraian";

export interface TransIndikator extends Indikator {
	uraianList: TransUraian[];
}
