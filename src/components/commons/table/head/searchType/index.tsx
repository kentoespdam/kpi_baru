import { Level } from "@myTypes/entity/level";
import { AuditStatus } from "@myTypes/index";
import { SearchType } from "@myTypes/table";
import { SearchValueProps } from "../search";

export type SearchTypeProps = {
	field: string;
	type?: SearchType;
	handleSearch: (field: string, value: SearchValueProps) => void;
	status?: AuditStatus | null;
	level?: Level | null;
};
