import TemplateProvider from "@components/commons/provider/theme";
import { ChildrenProps } from "@myTypes/index";

const Template = ({ children }: ChildrenProps) => {
	return <TemplateProvider>{children}</TemplateProvider>;
};

export default Template;
