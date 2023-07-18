import { Level } from "@myTypes/entity/level";
import { AuditStatus } from "@myTypes/index";
import { SearchType } from "@myTypes/table";

export type SearchTypeProps = {
	field: string;
	type?: SearchType;
	handleSearch: (
		field: string,
		value: string | number | Level | null
	) => void;
	status?: AuditStatus | null;
	level?: Level | null;
};
