"use client";
import { ChildrenProps } from "@myTypes/index";
import dynamic from "next/dynamic";

const GlobalNav = dynamic(() => import("../navcumb"));
const Container = dynamic(() => import("@mui/material/Container"));
const Toolbar = dynamic(() => import("@mui/material/Toolbar"));

const ContentComponent = ({ children }: ChildrenProps) => {
	return (
		<Container maxWidth="xl">
			<Toolbar />
			<GlobalNav />
			{children}
		</Container>
	);
};

export default ContentComponent;
