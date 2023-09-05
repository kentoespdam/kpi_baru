"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChildrenProps } from "@myTypes/index";
import { useTemplateStore } from "@store/main/template";
import { SnackbarProvider } from "notistack";
import { useEffect, useMemo } from "react";
import { myTheme } from "../theme";
import dynamic from "next/dynamic";
const CssBaseline = dynamic(() => import("@mui/material/CssBaseline"));
// import LogRocket from 'logrocket';
// LogRocket.init('qamvb0/kpi');

const TemplateProvider = ({ children }: ChildrenProps) => {
	// const mode = "light";
	const theme = useMemo(() => {
		return createTheme(myTheme());
	}, []);
	const isDesktop = useMediaQuery("(min-width:600px)");

	useEffect(() => useTemplateStore.setState({ isDesktop }), [isDesktop]);

	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<SnackbarProvider maxSnack={3} autoHideDuration={3000}>
					{children}
				</SnackbarProvider>
			</ThemeProvider>
		</>
	);
};

export default TemplateProvider;
