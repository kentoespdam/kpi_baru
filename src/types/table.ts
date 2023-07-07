import { TableCellProps } from "@mui/material/TableCell";

type SearchType = "text" | "number";

type Searchacble =
	| {
			searchable: "true";
			type: SearchType;
	  }
	| {};

export type MyTableHead = {
	field: string | null;
	title: string;
	sortable?: "true" | "false";
} & TableCellProps &
	Searchacble;
