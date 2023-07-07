// ==============================|| OVERRIDES - CHECKBOX ||============================== //

import { Theme } from "@mui/material/styles";

export default function CheckBoxOverrides(theme: Theme) {
	return {
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: theme.palette.secondary[300]
				},
			},
		},
	};
}
