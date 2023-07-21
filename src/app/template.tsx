import QueryProvider from "@components/commons/provider/query";
import SessionProvider from "@components/commons/provider/session";
import TemplateProvider from "@components/commons/provider/theme";
import { ChildrenProps } from "@myTypes/index";
import { cookies } from "next/dist/client/components/headers";
import { sessionNames } from "src/lib";

const Template = ({ children }: ChildrenProps) => {
	const cookie = cookies();
	const isLogin = cookie.has(sessionNames[0]);
	return (
		<>
			<TemplateProvider>
				<QueryProvider>
					<SessionProvider isLogin={isLogin} />
					{children}
				</QueryProvider>
			</TemplateProvider>
		</>
	);
};

export default Template;
