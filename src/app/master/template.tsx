import { ChildrenProps } from "@myTypes/index";
import dynamic from "next/dynamic";

const SessionProvider = dynamic(
	() => import("@components/commons/provider/session")
);
const ContentComponent = dynamic(() => import("@components/template/content"));
const MenuDrawerComponent = dynamic(
	() => import("@components/template/drawer")
);
const TopBarComponent = dynamic(() => import("@components/template/topbar"));

const Template = ({ children }: ChildrenProps) => {
	return (
		<>
			<SessionProvider />
			<TopBarComponent />
			<MenuDrawerComponent />
			<ContentComponent>{children}</ContentComponent>
		</>
	);
};

export default Template;
