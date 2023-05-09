import { LOCAL_POSITION } from "@interfaces/IPosition";
import { cache } from "react";

export const getPosition = cache(async () => {
	const req = await fetch(LOCAL_POSITION, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
}); // 1 hour cache
