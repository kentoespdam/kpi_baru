"use client";

import { myTheme } from "@components/commons/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ChildrenProps } from "@myTypes/index";

const TemplateComponent = ({ children }: ChildrenProps) => {
	const theme = createTheme(myTheme());
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{ display: "flex", width: "100%", minHeight: "100vh" }}>
				{children}
			</Box>
		</ThemeProvider>
	);
};

export default TemplateComponent;
