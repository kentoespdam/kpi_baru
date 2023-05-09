import { LOCAL_INDIKATOR } from "@interfaces/IIndikator";
import { cache } from "react";

export const getIndikator = cache(async (kpiId?: number) => {
	const search = new URLSearchParams();
	if (kpiId !== undefined) search.append("kpiId", kpiId.toString());

	const req = await fetch(`${LOCAL_INDIKATOR}/list?${search.toString()}`, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
}); // 1 hour cache
