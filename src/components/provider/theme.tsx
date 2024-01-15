"use client";

import { ThemeProvider, createTheme } from "@mui/material";

const NextTheme = ({ children }: { children: React.ReactNode }) => {
	const theme = createTheme({
		palette: {
			mode: "light",
		},
	});
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default NextTheme;
