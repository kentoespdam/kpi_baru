import { z } from "zod";
import { BaseId } from "..";
import { Organization } from "./organization";

export const Position = BaseId.extend({
	name: z.string(),
	code: z.string(),
	level: z.number(),
	parent: z.number(),
	golongan: z.string(),
	organization: z.nullable(Organization),
});

export type Position = z.infer<typeof Position>;
