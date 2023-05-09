import { LOCAL_PERILAKU } from "@interfaces/IPerilaku";
import { cache } from "react";

export const getPerilaku = cache(async () => {
	const req = await fetch(`${LOCAL_PERILAKU}/list`, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
}); // 1 hour cache
