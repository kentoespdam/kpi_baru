"use client";

import QueryProvider from "@components/commons/provider/query";
import TemplateProvider from "@components/commons/provider/theme";
import { ChildrenProps } from "@myTypes/index";
import ContentComponent from "./content";
import MenuDrawerComponent from "./drawer";
import TopBarComponent from "./topbar";

const TemplateComponent = ({ children }: ChildrenProps) => {
	return (
		<QueryProvider>
			<TemplateProvider>
				<TopBarComponent />
				<MenuDrawerComponent />
				<ContentComponent>{children}</ContentComponent>
			</TemplateProvider>
		</QueryProvider>
	);
};

export default TemplateComponent;
