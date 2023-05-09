"use client";
import { IChildrenProps } from "@commons/types";
import TopBar from "./top.bar";
import MenuDrawerComponent from "./menu.drawer";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import FooterComponent from "./footer";
import { useEffect, useState } from "react";
import NotifSnackbar from "@commons/components/notif";

const TemplateComponent = ({ children }: IChildrenProps) => {
	const [elv, setElv] = useState(0);

	const onScroll = (e: Event) => {
		const window = e.currentTarget as Window;
		window.scrollY > 20 ? setElv(8) : setElv(0);
	};

	useEffect(() => {
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	});

	return (
		<>
			<TopBar elv={elv} />
			<MenuDrawerComponent />
			<Container maxWidth="xl">
				<Toolbar />
				{children}
				<FooterComponent
					sx={{ mt: 10, width: "100%", textAlign: "center" }}
				/>
				<NotifSnackbar />
			</Container>
		</>
	);
};

export default TemplateComponent;
