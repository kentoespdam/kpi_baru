import QueryProvider from "@components/commons/provider/query";
import TemplateProvider from "@components/commons/provider/theme";
import { ChildrenProps } from "@myTypes/index";

const Template = ({ children }: ChildrenProps) => {
	return (
		<QueryProvider>
			<TemplateProvider>{children}</TemplateProvider>
		</QueryProvider>
	);
};

export default Template;
