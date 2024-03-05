import { BaseId } from "..";
import { Organization } from "./organization";
import { Position } from "./position";
import z from "zod";
import { SysRef } from "./sysref";

const EMP_STATUS = ["ACTIVE", "INACTIVE", "DELETED"] as const;
export const EmpStatus = z.enum(EMP_STATUS);
export type EmpStatus = z.infer<typeof EmpStatus>;

export const Employee = BaseId.extend({
	id: z.number(),
	nipam: z.string(),
	nama: z.string(),
	position: Position,
	organization: Organization,
	flagStatus: SysRef,
	workStatus: SysRef,
	status: EmpStatus,
});

export type Employee = z.infer<typeof Employee>;
