import { ApiResponse, EmpStatus } from "..";
import { Organization } from "./organization";
import { Position } from "./position";
import { SysRef } from "./sysref";

export const LOCAL_EMPLOYEE = "/api/eo/employee";
export const REMOTE_EMPLOYEE = `${process.env.EO_API}/pegawai`;

export interface Employee {
	id: number;
	nipam: string;
	nama: string;
	position: Position;
	organization: Organization;
	flagStatus: SysRef;
	workStatus: SysRef;
	status: EmpStatus;
}

export interface EmployeeSingleResponse extends ApiResponse<Employee> {}

export interface EmployeeListResponse extends ApiResponse<Employee[]> {}
