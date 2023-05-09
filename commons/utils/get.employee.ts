import { LOCAL_EMPLOYEE } from "@interfaces/IEmployee";
import { cache } from "react";

export const getEmployee = cache(async (orgCode?: string) => {
	const req = await fetch(`${LOCAL_EMPLOYEE}?organizationCode=${orgCode}`, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
}); // 1 hour cache

export const getEmployeeByNipam = cache(async (nipam: string) => {
	const req = await fetch(`${LOCAL_EMPLOYEE}?nipam=${nipam}`, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
}); // 1 hour cache

export const getEmployeeByPosition = cache(async (posId: number) => {
	const req = await fetch(`${LOCAL_EMPLOYEE}?posId=${posId}`, {
		next: { revalidate: 60 * 60 },
	});
	const res = await req.json();
	return res;
}); // 1 hour cache
