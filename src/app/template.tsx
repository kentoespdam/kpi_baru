import QueryProvider from "@components/commons/provider/query";
import SessionProvider from "@components/commons/provider/session";
import TemplateProvider from "@components/commons/provider/theme";
import { ChildrenProps } from "@myTypes/index";
import { cookies } from "next/dist/client/components/headers";

const Template = ({ children }: ChildrenProps) => {
	const cookie = cookies();
	return (
		<>
			<TemplateProvider>
				<QueryProvider>
					<SessionProvider cookies={cookie} />
					{children}
				</QueryProvider>
			</TemplateProvider>
		</>
	);
};

export default Template;
