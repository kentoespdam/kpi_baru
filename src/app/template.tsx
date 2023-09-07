import QueryProvider from "@components/commons/provider/query";
import SessionProvider from "@components/commons/provider/session";
import TemplateProvider from "@components/commons/provider/theme";
import { ChildrenProps } from "@myTypes/index";

const Template = ({ children }: ChildrenProps) => {
	return (
		<>
			<TemplateProvider>
				<QueryProvider>
					<SessionProvider />
					{children}
				</QueryProvider>
			</TemplateProvider>
		</>
	);
};

export default Template;
