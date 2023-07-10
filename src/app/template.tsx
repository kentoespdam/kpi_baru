import TemplateComponent from "@components/template";
import { ChildrenProps } from "@myTypes/index";

const Template = ({ children }: ChildrenProps) => {
	return <TemplateComponent>{children}</TemplateComponent>;
};

export default Template;
