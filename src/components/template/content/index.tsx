"use client";
import { Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
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
