import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import { sessionNames } from "src/lib";

export default function Home() {
	const cookie = cookies();
	const isLogin = cookie.has(sessionNames[0]) || cookie.has(sessionNames[1]);

	if (isLogin) redirect("/trans/kpi");
	else redirect("/login");
}
