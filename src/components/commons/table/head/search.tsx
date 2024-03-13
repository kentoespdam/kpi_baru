import TableCell from "@mui/material/TableCell";
import { MyTableHead } from "@myTypes/table";
import dynamic from "next/dynamic";
import { BasicSearchBuilderProps, SearchValueProps } from "./searchType";
import TableRow from "@mui/material/TableRow";

const SearchTypeAuditStatus = dynamic(
	() => import("./searchType/audit.status")
);
const SearchTypeKpi = dynamic(() => import("./searchType/kpi"));
const SearchTypeLevel = dynamic(() => import("./searchType/level"));
const SearchTypeOrganization = dynamic(
	() => import("./searchType/organization")
);
const SearchtypePerilaku = dynamic(() => import("./searchType/perilaku"));
const SearchTypePosition = dynamic(() => import("./searchType/position"));
const SearchTypeText = dynamic(() => import("./searchType/text"));

type HeaderSearchCellBuilderProps = {
	header: MyTableHead;
	handleSearch: (field: string, value: SearchValueProps) => void;
} & BasicSearchBuilderProps;
const HeaderSearchCellBuilder = (props: HeaderSearchCellBuilderProps) => {
	const { header, handleSearch, status, ...other } = props;

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
						level={other.level}
					/>
				</TableCell>
			);
		case "position":
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchTypePosition
						field={header.field!}
						handleSearch={handleSearch}
						position={other.position}
					/>
				</TableCell>
			);
		case "organization":
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchTypeOrganization
						field={header.field!}
						handleSearch={handleSearch}
						organization={other.organization}
					/>
				</TableCell>
			);
		case "kpi":
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchTypeKpi
						field={header.field!}
						handleSearch={handleSearch}
						kpi={other.kpi}
					/>
				</TableCell>
			);
		case "perilaku":
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchtypePerilaku
						field={header.field!}
						handleSearch={handleSearch}
						perilaku={other.perilaku}
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
						{...other}
					/>
				</TableCell>
			);
	}
};

type HeaderSearchBuilderProps = {
	headers: MyTableHead[];
	handleSearch: (field: string, value: SearchValueProps) => void;
} & BasicSearchBuilderProps;
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
