"use client";
import { useRouter } from "next/navigation";

type HomeComponentProps = {
	isLogin: boolean;
};
const HomeComponent = (props: HomeComponentProps) => {
	const { isLogin } = props;
	const routes = useRouter();

	if (isLogin) routes.push("/trans/kpi");
	else routes.push("/auth");
	return null;
};

export default HomeComponent;
