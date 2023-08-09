import { Theme } from "@mui/material/styles";

export default function TableCellOverrides(theme: Theme) {
	return {
		MuiTableBody: {
			styleOverrides: {
				root: {
					"& .MuiTableRow-root:nth-of-type(odd)": {
						"backgroundColor": theme.palette.grey[100],
						"&:hover": {
							backgroundColor: theme.palette.action.hover,
						},
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontSize: "0.875rem",
					padding: 6,
					borderColor: theme.palette.divider,
				},
				head: {
					fontWeight: 600,
					textAlign: "center",
					// paddingTop: 20,
					// paddingBottom: 20,
				},
			},
		},
	};
}
