import { Theme } from "@mui/material/styles";

export default function InputLabelOverrides(theme: Theme) {
	return {
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: theme.palette.grey[600],
					// backgroundColor: "transparent",
				},
				outlined: {
					lineHeight: "0.9em",
					"&.MuiInputLabel-sizeSmall": {
						lineHeight: "1em",
					},
					"&.MuiInputLabel-shrink": {
						// background: theme.palette.background.paper,
						padding: "0 8px",
						marginLeft: -6,
						lineHeight: "1.4375em",
						borderTopLeftRadius: "5px",
						borderTopRightRadius: "5px",
					},
				},
			},
		},
	};
}
