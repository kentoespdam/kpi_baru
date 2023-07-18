import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { MyTableHead } from "@myTypes/table";
import SearchTypeText from "./searchType/text";
import SearchTypeAuditStatus from "./searchType/audit.status";
import { AuditStatus } from "@myTypes/index";
import SearchTypeLevel from "./searchType/level";
import { Level } from "@myTypes/entity/level";

export type SearchValueProps = string | number | Level | null;

type HeaderSearchCellBuilderProps = {
	header: MyTableHead;
	handleSearch: (field: string, value: SearchValueProps) => void;
	status?: AuditStatus | null;
};
const HeaderSearchCellBuilder = (props: HeaderSearchCellBuilderProps) => {
	const { header, handleSearch, status } = props;

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
						status={status}
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
};
const HeaderSearchBuilder = (props: HeaderSearchBuilderProps) => {
	const { headers, handleSearch, status } = props;
	return (
		<TableRow>
			{headers.map((header, index) => (
				<HeaderSearchCellBuilder
					key={index}
					header={header}
					handleSearch={handleSearch}
					status={status}
				/>
			))}
		</TableRow>
	);
};

export default HeaderSearchBuilder;
