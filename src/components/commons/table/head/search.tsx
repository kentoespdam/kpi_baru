import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { MyTableHead } from "@myTypes/table";
import SearchTypeText from "./searchType/text";
import SearchTypeAuditStatus from "./searchType/audit.status";
import { AuditStatus } from "@myTypes/index";
import SearchTypeLevel from "./searchType/level";
import { Level } from "@myTypes/entity/level";
import { Organization } from "@myTypes/entity/organization";
import { Position } from "@myTypes/entity/position";
import SearchTypePosition from "./searchType/position";
import SearchTypeOrganization from "./searchType/organization";
import { Kpi } from "@myTypes/entity/kpi";
import SearchTypeKpi from "./searchType/kpi";
import { Perilaku } from "@myTypes/entity/perilaku";
import SearchtypePerilaku from "./searchType/perilaku";

export type SearchValueProps =
	| string
	| number
	| Level
	| Position
	| Organization
	| Kpi
	| Perilaku
	| null;

type HeaderSearchCellBuilderProps = {
	header: MyTableHead;
	handleSearch: (field: string, value: SearchValueProps) => void;
	status?: AuditStatus | null;
	level?: Level | null;
	position?: Position | null;
	organization?: Organization | null;
	kpi?: Kpi | null;
	perilaku?: Perilaku | null;
};
const HeaderSearchCellBuilder = (props: HeaderSearchCellBuilderProps) => {
	const {
		header,
		handleSearch,
		status,
		level,
		position,
		organization,
		kpi,
		perilaku,
	} = props;

	if (header.searchable === "false") return <TableCell></TableCell>;

	switch (header.type) {
		case "auditStatus":
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchTypeAuditStatus
						field={header.field!}
						handleSearch={handleSearch}
						status={status}
					/>
				</TableCell>
			);
		case "level":
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchTypeLevel
						field={header.field!}
						handleSearch={handleSearch}
						level={level}
					/>
				</TableCell>
			);
		case "position":
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchTypePosition
						field={header.field!}
						handleSearch={handleSearch}
						position={position}
					/>
				</TableCell>
			);
		case "organization":
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchTypeOrganization
						field={header.field!}
						handleSearch={handleSearch}
						organization={organization}
					/>
				</TableCell>
			);
		case "kpi":
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchTypeKpi
						field={header.field!}
						handleSearch={handleSearch}
						kpi={kpi}
					/>
				</TableCell>
			);
		case "perilaku":
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchtypePerilaku
						field={header.field!}
						handleSearch={handleSearch}
						perilaku={perilaku}
					/>
				</TableCell>
			);
		default:
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchTypeText
						field={header.field!}
						type={header.type}
						handleSearch={handleSearch}
					/>
				</TableCell>
			);
	}
};

type HeaderSearchBuilderProps = {
	headers: MyTableHead[];
	handleSearch: (field: string, value: SearchValueProps) => void;
	status?: AuditStatus | null;
	level?: Level | null;
	position?: Position | null;
	organization?: Organization | null;
	kpi?: Kpi | null;
	perilaku?: Perilaku | null;
};
const HeaderSearchBuilder = (props: HeaderSearchBuilderProps) => {
	const { headers, handleSearch, ...other } = props;
	return (
		<TableRow>
			{headers.map((header, index) => (
				<HeaderSearchCellBuilder
					key={index}
					header={header}
					handleSearch={handleSearch}
					{...other}
				/>
			))}
		</TableRow>
	);
};

export default HeaderSearchBuilder;
