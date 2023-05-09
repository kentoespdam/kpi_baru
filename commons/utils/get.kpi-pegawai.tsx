import { LOCAL_BRIDGE_KPI_PEGAWAI } from "@interfaces/IBridgeKpiPegawai";
import { cache } from "react";

export const getKpiPegawaiByNipam = cache(async (nipam: string) => {
	const req = await fetch(`${LOCAL_BRIDGE_KPI_PEGAWAI}/nipam/${nipam}`, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
}); // 1 hour cache
