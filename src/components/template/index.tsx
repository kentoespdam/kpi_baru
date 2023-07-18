"use client";

import QueryProvider from "@components/commons/provider/query";
import TemplateProvider from "@components/commons/provider/theme";
import { ChildrenProps } from "@myTypes/index";
import TopBarComponent from "./topbar";

const TemplateComponent = ({ children }: ChildrenProps) => {
	return (
		<TemplateProvider>
			<QueryProvider>
				<TopBarComponent />
				{/* <MenuDrawerComponent />
				<ContentComponent>{children}</ContentComponent> */}
				{children}
			</QueryProvider>
		</TemplateProvider>
	);
};

export default TemplateComponent;

/**
 * return (
		<QueryProvider>
			<TemplateProvider>
				<TopBarComponent />
				<MenuDrawerComponent />
				<ContentComponent>{children}</ContentComponent>
			</TemplateProvider>
		</QueryProvider>
	);
 */
