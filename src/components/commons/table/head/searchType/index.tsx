import { SearchType } from "@myTypes/table";

export type SearchTypeProps = {
	field: string;
	type?: SearchType;
	handleSearch: (field: string, value: string | number | null) => void;
};
