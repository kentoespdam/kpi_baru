import { LOCAL_GRADE } from "@interfaces/IGrade";
import { cache } from "react";

export const getGrade = cache(async () => {
	const req = await fetch(LOCAL_GRADE, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
}); // 1 hour cache
