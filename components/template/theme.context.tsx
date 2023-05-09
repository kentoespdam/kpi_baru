"use client";
import { IChildrenProps } from "@commons/types";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@storage/template";

const ThemeContext = ({ children }: IChildrenProps) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default ThemeContext;
