import TemplateComponent from "@components/template";
import MenuDrawerComponent from "@template/drawer";
import TopBarComponent from "@template/topbar";
import { ChildrenProps } from "@myTypes/index";
import ContentComponent from "@components/template/content";

const Template = ({ children }: ChildrenProps) => {
	return (
		<TemplateComponent>
			<TopBarComponent />
			<MenuDrawerComponent />
			<ContentComponent>{children}</ContentComponent>
		</TemplateComponent>
	);
};

export default Template;
