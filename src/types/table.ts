import { TableCellProps } from "@mui/material/TableCell";

export interface PageRequest {
	page: number;
	size: number;
}

export interface SortRequest {
	sort: string | null;
	direction: "asc" | "desc";
}

export type SearchType =
	| "text"
	| "number"
	| "auditStatus"
	| "level"
	| "organization"
	| "position"
	| "profesi"
	| "grade";

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
