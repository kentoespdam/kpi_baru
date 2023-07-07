import { Theme } from "@mui/material/styles";

export default function PaperOverrides(theme: Theme) {
	return {
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 4,
					// backgroudColor: theme.palette.background.default,
				},
				rounded: {
					borderRadius: 4,
				},
			},
		},
	};
}
