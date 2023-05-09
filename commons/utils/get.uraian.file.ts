import { LOCAL_URAIAN_FILE } from "@interfaces/IUraianFile";
import { cache } from "react";

export const getUraianIndikator = cache(async (indikatorId?: number) => {
	const search = new URLSearchParams();
	if (indikatorId !== undefined)
		search.append("indikatorId", indikatorId.toString());
	const req = await fetch(`${LOCAL_URAIAN_FILE}/list?${search.toString()}`, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
});
