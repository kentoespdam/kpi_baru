import { AuditStatus } from "@myTypes/index";
import { SearchType } from "@myTypes/table";

export type SearchTypeProps = {
	field: string;
	type?: SearchType;
	handleSearch: (field: string, value: string | number | null) => void;
	status?: AuditStatus;
	level?: string;
};
