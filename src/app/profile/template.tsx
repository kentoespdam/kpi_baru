import { ChildrenProps } from "@myTypes/index";
import dynamic from "next/dynamic";

const ContentComponent = dynamic(() => import("@components/template/content"));
const MenuDrawerComponent = dynamic(
	() => import("@components/template/drawer")
);
const TopBarComponent = dynamic(() => import("@components/template/topbar"));

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
