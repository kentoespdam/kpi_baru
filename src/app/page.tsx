import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import { APP_URL, sessionNames } from "src/lib";

export default function Home() {
	const cookie = cookies();
	const isLogin = cookie.has(sessionNames[0]) || cookie.has(sessionNames[1]);

	if (isLogin) redirect(`${APP_URL}/trans/kpi`);
	else redirect(`${APP_URL}/login`);
}
