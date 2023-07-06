import {
	Palette,
	PaletteColor,
	PaletteOptions,
	SimplePaletteColorOptions,
	Theme,
	ThemeOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Shadow {
		button: string;
		text: string;
		z1: string;
	}

	interface Theme {
		customShadows: Shadow;
	}

	interface ThemeOptions {
		customShadows?: Shadow;
	}

	interface CustomTheme extends Theme {
		palette: CustomPalette;
		status: {
			danger: string;
		};
		customShadows: Shadow;
	}

	interface CustomPalette extends PaletteOptions {
		common: CommonColors;
		mode: PaletteMode;
		contrastThreshold: number;
		tonalOffset: PaletteTonalOffset;
		primary: PaletteColor;
		secondary: PaletteColor;
		error: PaletteColor;
		warning: PaletteColor;
		info: PaletteColor;
		success: PaletteColor;
		grey: Color;
		text: TypeText;
		divider: TypeDivider;
		action: TypeAction;
		background: TypeBackground;
		grey: CustomSimplePaletteColorOptions | ColorPartial;
		getContrastText: (background: string) => string;
		augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;
	}

	interface CustomSimplePaletteColorOptions
		extends SimplePaletteColorOptions {
		lighter?: string;
		darker?: string;
	}

	interface PaletteColor {
		light: string;
		lighter: string;
		main: string;
		dark: string;
		darker: string;
		contrastText: string;
		0: string;
		100: string;
		200: string;
		300: string;
		400: string;
		600: string;
		700: string;
		800: string;
		900: string;
		A50: string;
		A100: string;
		A200: string;
		A300: string;
		A400: string;
		A600: string;
		A700: string;
		A800: string;
		A900: string;
	}

	export function createTheme(options?: ThemeOptions): CustomTheme;
}
