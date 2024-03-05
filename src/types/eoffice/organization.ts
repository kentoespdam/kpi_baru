import { z } from "zod";
import { BaseId } from "..";

export const Organization = BaseId.extend({
	id: z.number(),
	name: z.string(),
	code: z.string(),
	level: z.number(),
	parent: z.number(),
	category: z.string(),
});

export type Organization = z.infer<typeof Organization>;
