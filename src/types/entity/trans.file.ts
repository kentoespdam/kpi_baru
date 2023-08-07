import { BaseId } from "..";

export interface TransFile extends BaseId {
	nipam: string;
	fileName: string;
	fileType: string;
}
