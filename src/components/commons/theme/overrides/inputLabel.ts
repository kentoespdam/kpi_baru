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
					"transform": "translate(14px, 12px) scale(1)",
					"&.MuiInputLabel-shrink": {
						transform: "translate(14px, -9px) scale(.75)",
						// background: theme.palette.background.paper,
						// padding: "0 8px",
						// marginLeft: -6,
						// lineHeight: "1.4375em",
						// borderTopLeftRadius: "5px",
						// borderTopRightRadius: "5px",
					},
				},
			},
		},
	};
}

/**
 * outlined: {
					transform: "translate(14px, 12px) scale(1)",
					"&.MuiInputLabel-sizeSmall": {
						// lineHeight: "1em",
					},
					"&.MuiInputLabel-shrink": {
						// background: theme.palette.background.paper,
						// padding: "0 8px",
						// marginLeft: -6,
						// lineHeight: "1.4375em",
						// borderTopLeftRadius: "5px",
						// borderTopRightRadius: "5px",
					},
				},
 */
