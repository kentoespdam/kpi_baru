import { BaseId } from "..";

export interface TransFile extends BaseId {
	fileName: string;
	fileType: string;
}
