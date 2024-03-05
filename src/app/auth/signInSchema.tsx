import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().min(9, "required username!"),
	password: z.string().min(8),
});
