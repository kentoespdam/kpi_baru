import { Theme } from "@mui/material/styles";

export default function ListItemButtonOverrides(theme: Theme) {
	return {
		MuiListItemButton: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						backgroundColor: theme.palette.primary.lighter,
						borderRight: `2px solid ${theme.palette.primary.main}`,
					},
				},
			},
		},
	};
}
