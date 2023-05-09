import { LOCAL_PROFESI } from "@interfaces/IProfesi";
import { cache } from "react";

export const getProfesi = cache(async () => {
	const req = await fetch(`${LOCAL_PROFESI}/list`, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
}); // 1 hour cache
