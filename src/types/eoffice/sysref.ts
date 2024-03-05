import { z } from "zod";

export const SysRef = z.object({
	id: z.number(),
	code: z.string(),
	value: z.number(),
	text: z.string(),
});

export type SysRef = z.infer<typeof SysRef>;
