import { TableCellProps } from "@mui/material/TableCell";

export interface PageRequest {
	page: number;
	size: 10;
}

export interface SortRequest {
	sort: string | null;
	direction: "asc" | "desc";
}

export type SearchType = "text" | "number" | "auditStatus";

type Searchacble =
	| {
			searchable: "true";
			type: SearchType;
	  }
	| { searchable: "false" };

export type MyTableHead = {
	field: string | null;
	title: string;
	sortable?: "true" | "false";
} & TableCellProps &
	Searchacble;
