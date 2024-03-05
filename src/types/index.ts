import { z } from "zod";

export type ObjectValues<T> = T[keyof T];

export const USER_ROLE = ["USER", "ADMIN"] as const;
export const UserRole = z.enum(USER_ROLE);
export type UserRole = z.infer<typeof UserRole>;

export const Audit = z.object({
	createdAt: z.date(),
	createdBy: z.string(),
	updatedAt: z.date(),
	updatedBy: z.string(),
});
export type Audit = z.infer<typeof Audit>;

export const AUDIT_STATUS = ["Enabled", "Disabled", "Deleted"] as const;
export const AuditStatus = z.enum(["Enabled", "Disabled", "Deleted"]);
export type AuditStatus = z.infer<typeof AuditStatus>;

export const BaseId = z.object({
	id: z.number(),
	status: AuditStatus.optional(),
});

export type BaseId = z.infer<typeof BaseId>;

