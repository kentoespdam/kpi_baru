import { Level } from "@myTypes/entity/level";
import { AuditStatus } from "@myTypes/index";
import { PageRequest, SortRequest } from "@myTypes/table";

export interface BaseStore {
	loading: boolean;
	pageRequest: PageRequest;
	setPageRequest: (pageRequest: PageRequest) => void;
	sortRequest: SortRequest;
	setSortRequest: (sortRequest: SortRequest) => void;
	setKeyVal: (field: string, value: string | number | Level | null) => void;
}
