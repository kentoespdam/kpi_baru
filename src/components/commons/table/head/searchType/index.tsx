import { Level } from "@myTypes/entity/level";
import { AuditStatus } from "@myTypes/index";
import { SearchType } from "@myTypes/table";
import { SearchValueProps } from "../search";
import { Position } from "@myTypes/entity/position";
import { Organization } from "@myTypes/entity/organization";
import { Kpi } from "@myTypes/entity/kpi";
import { Perilaku } from "@myTypes/entity/perilaku";

export type SearchTypeProps = {
	field: string;
	type?: SearchType;
	handleSearch: (field: string, value: SearchValueProps) => void;
	status?: AuditStatus | null;
	level?: Level | null;
	position?: Position | null;
	organization?: Organization | null;
	kpi?: Kpi | null;
	perilaku?: Perilaku | null;
};
