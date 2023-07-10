import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { MyTableHead } from "@myTypes/table";
import SearchTypeText from "./searchType/text";
import SearchTypeAuditStatus from "./searchType/audit.status";

type HeaderSearchCellBuilderProps = {
	header: MyTableHead;
	handleSearch: (field: string, value: string | number | null) => void;
};
const HeaderSearchCellBuilder = (props: HeaderSearchCellBuilderProps) => {
	const { header, handleSearch } = props;

	if (header.searchable === "false") return <TableCell></TableCell>;

	switch (header.type) {
		case "auditStatus":
			return (
				<TableCell sx={{ p: 1 }}>
					<SearchTypeAuditStatus
						field={header.field!}
						handleSearch={handleSearch}
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
	handleSearch: (field: string, value: string | number | null) => void;
};
const HeaderSearchBuilder = (props: HeaderSearchBuilderProps) => {
	const { headers, handleSearch } = props;
	return (
		<TableRow>
			{headers.map((header, index) => (
				<HeaderSearchCellBuilder
					key={index}
					header={header}
					handleSearch={handleSearch}
				/>
			))}
		</TableRow>
	);
};

export default HeaderSearchBuilder;
