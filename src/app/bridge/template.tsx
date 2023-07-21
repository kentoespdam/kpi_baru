import ContentComponent from "@components/template/content";
import MenuDrawerComponent from "@components/template/drawer";
import TopBarComponent from "@components/template/topbar";
import { ChildrenProps } from "@myTypes/index";

const Template = ({ children }: ChildrenProps) => {
	return (
		<>
			<TopBarComponent />
			<MenuDrawerComponent />
			<ContentComponent>{children}</ContentComponent>
		</>
	);
};

export default Template;
