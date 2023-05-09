import { LOCAL_ORGANIZATION } from "@interfaces/IOrganization";
import { cache } from "react";

export const getOrganization = cache(async () => {
	const req = await fetch(LOCAL_ORGANIZATION, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
}); // 1 hour cache
