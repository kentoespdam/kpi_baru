import { Level } from "@myTypes/entity/level";
import { AuditStatus } from "@myTypes/index";
import { SearchType } from "@myTypes/table";
import { Position } from "@myTypes/entity/position";
import { Organization } from "@myTypes/entity/organization";
import { Kpi } from "@myTypes/entity/kpi";
import { Perilaku } from "@myTypes/entity/perilaku";
import { Profesi } from "@myTypes/entity/profesi";

export type SearchValueProps =
	| string
	| number
	| Profesi
	| Level
	| Position
	| Organization
	| Kpi
	| Perilaku
	| null;

export type BasicSearchBuilderProps = {
	status?: AuditStatus | null;
	level?: Level | null;
	position?: Position | null;
	organization?: Organization | null;
	kpi?: Kpi | null;
	perilaku?: Perilaku | null;
	nipam?: string | null;
	name?: string | null;
};

export type SearchTypeProps = {
	field: string;
	type?: SearchType;
	handleSearch: (field: string, value: SearchValueProps) => void;
} & BasicSearchBuilderProps;
