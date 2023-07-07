import { Theme } from "@mui/material/styles";

export default function ListItemIconOverrides(theme: Theme) {
	return {
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					minWidth: 24,
				},
			},
		},
	};
}
