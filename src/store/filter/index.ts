import { SearchValueProps } from "@components/commons/table/head/searchType";
import { PageRequest, SortRequest } from "@myTypes/table";

export interface BaseStore {
	loading?: boolean;
	pageRequest: PageRequest;
	setPageRequest: (pageRequest: PageRequest) => void;
	sortRequest: SortRequest;
	setSortRequest: (sortRequest: SortRequest) => void;
	setKeyVal: (field: string, value: SearchValueProps) => void;
}
