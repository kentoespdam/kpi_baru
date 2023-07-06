"use client";

import { myTheme } from "@components/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { ChildrenProps } from "@myTypes/index";

const TemplateComponent = ({ children }: ChildrenProps) => {
	return (
		<ThemeProvider theme={myTheme}>
			<CssBaseline />
			<Box sx={{ display: "flex", width: "100%" }}>{children}</Box>
		</ThemeProvider>
	);
};

export default TemplateComponent;
