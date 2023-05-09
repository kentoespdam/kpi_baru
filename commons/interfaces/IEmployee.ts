import { EEmpStatus } from "./EStatus";
import { IOrganization } from "./IOrganization";
import { IPosition } from "./IPosition";
import { ISysRef } from "./ISysRef";

export const LOCAL_EMPLOYEE = "/api/eo/employee";
export const REMOTE_EMPLOYEE = `${process.env.EO_API}/pegawai`;

export interface IEmployee {
	id: number;
	nipam: string;
	nama: string;
	position: IPosition;
	organization: IOrganization;
	flagStatus: ISysRef;
	workStatus: ISysRef;
	status: EEmpStatus;
}
