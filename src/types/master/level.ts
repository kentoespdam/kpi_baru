import { z } from "zod";
import { Audit, BaseId } from "..";

export const Level = BaseId.extend({
	level: z.string(),
});

export type Level = z.infer<typeof Level>;

export const LevelWithAudit = Level.merge(Audit);
export type LevelWithAudit = z.infer<typeof LevelWithAudit>;
