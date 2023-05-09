import {
	tableBodyClasses,
	tableCellClasses,
	tableFooterClasses,
	tableHeadClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import { tableRowClasses } from "@mui/material/TableRow";

const StripedTableStyle = styled(Table)(({ theme }) => ({
	[`& .${tableCellClasses.root}`]: {
		border: `1px solid ${theme.palette.grey[300]}`,
		minWidth: 30,
		padding: 5,
	},
	[`& .${tableHeadClasses.root}`]: {
		[`& .${tableRowClasses.root}`]: {
			[`& .${tableCellClasses.root}`]: {
				textAlign: "center",
			},
		},
	},
	[`& .${tableBodyClasses.root}`]: {
		[`& .${tableRowClasses.root}:nth-of-type(even)`]: {
			background: theme.palette.grey[200],
		},
	},
	[`.${tableBodyClasses.root} .${tableRowClasses.root}:hover`]: {
		background: theme.palette.grey[300],
	},
	[`.${tableFooterClasses.root} .${tableCellClasses.root}`]: {
		fontWeight: "bold",
	},
}));

export default StripedTableStyle;
