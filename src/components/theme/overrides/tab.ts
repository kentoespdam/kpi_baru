import { Theme } from "@mui/material/styles";

export default function TabOverrides(theme: Theme) {
	return {
		MuiTab: {
			styleOverrides: {
				root: {
					minHeight: 46,
					color: theme.palette.text.primary,
				},
			},
		},
	};
}
