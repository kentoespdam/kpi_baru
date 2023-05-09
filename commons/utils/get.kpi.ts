import { LOCAL_KPI } from "@interfaces/IKpi";
import { cache } from "react";

export const getKpi = cache(async () => {
	const req = await fetch(`${LOCAL_KPI}/list`, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
}); // 1 hour cache
