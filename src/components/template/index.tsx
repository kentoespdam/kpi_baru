"use client";

import QueryProvider from "@components/commons/provider/query";
import TemplateProvider from "@components/commons/provider/theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChildrenProps } from "@myTypes/index";
import { useEffect } from "react";
import { useTemplateStore } from "@store/main/template";
import { shallow } from "zustand/shallow";
import ContentComponent from "./content";
import MenuDrawerComponent from "./drawer";
import TopBarComponent from "./topbar";

const TemplateComponent = ({ children }: ChildrenProps) => {
	const matches = useMediaQuery(`(min-width:600px)`);
	const setDesktop = useTemplateStore((state) => state.setDesktop, shallow);

	// useEffect(() => {
	// 	setDesktop(matches);
	// 	return () => {
	// 		setDesktop(matches);
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [matches]);

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
