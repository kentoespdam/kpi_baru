import { alpha, createTheme } from "@mui/material/styles";
import { myPalette } from "./palette";
import { common } from "@mui/material/colors";
import { myTypography } from "./typography";
import OverridesComponent from "./overrides";

export const myTheme = () => {
	const cusPalette = myPalette();
	const myTheme = createTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 768,
				md: 1024,
				lg: 1266,
				xl: 1536,
			},
		},
		mixins: {
			toolbar: {
				minHeight: 60,
				paddingTop: 0,
				paddingBottom: 0,
				backgroundColor: common.white,
			},
		},
		palette: { ...cusPalette.palette, mode: "light" },
		typography: myTypography,
		customShadows: {
			button: `0 2px #0000000b`,
			text: `0 -1px 0 rgb(0 0 0 / 12%)`,
			z1: `0px 2px 8px ${alpha(cusPalette.palette.grey[900], 0.15)}`,
		},
	});

	return createTheme({
		...myTheme,
		components: OverridesComponent(myTheme),
	});
};
