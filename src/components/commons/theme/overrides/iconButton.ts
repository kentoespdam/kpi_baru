import { Theme } from "@mui/material/styles";

export default function IconButtonOverrides(theme: Theme) {
	return {
		MuiIconButton: {
			styleOverrides: {
				root: {
					borderRadius: 4,
					bgcolor: theme.palette.grey[100],
					color: theme.palette.primary,
					"&:hover": {
						backgroundColor: theme.palette.primary[100],
						color: theme.palette.grey[700],
					},
				},
				sizeLarge: {
					width: theme.spacing(5.5),
					height: theme.spacing(5.5),
					fontSize: "1.25rem",
				},
				sizeMedium: {
					width: theme.spacing(4.5),
					height: theme.spacing(4.5),
					fontSize: "1rem",
				},
				sizeSmall: {
					width: theme.spacing(3.75),
					height: theme.spacing(3.75),
					fontSize: "0.75rem",
				},
			},
		},
	};
}
