import CellBuilder from "@commons/components/table/cell.builder";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

type PerilakuStaffTableFooterProps = {
	total: number;
};
const PerilakuStaffTableFooter = (props: PerilakuStaffTableFooterProps) => {
	const { total } = props;
	return (
		<TableBody>
			<TableRow>
				<CellBuilder colSpan={3} align="right" value="Total" />
				<CellBuilder value={total} />
			</TableRow>
		</TableBody>
	);
};

export default PerilakuStaffTableFooter;
