"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { myTheme } from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ChildrenProps } from "@myTypes/index";
import { SnackbarProvider } from "notistack";

const TemplateProvider = ({ children }: ChildrenProps) => {
	const theme = createTheme(myTheme());
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
