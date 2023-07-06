"use client";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { ChildrenProps } from "@myTypes/index";
import GlobalNav from "../navcumb";

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
