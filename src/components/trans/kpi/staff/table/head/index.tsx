import CellBuilder from "@components/commons/table/cell.builder";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const KpiStaffTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<CellBuilder bordered value="NO" />
				<CellBuilder bordered value="INDIKATOR KINJERJA KUNCI (KPI)" />
				<CellBuilder bordered value="PENJELASAN / RUMUSAN KPI" />
				<CellBuilder bordered value="STATUS" />
				<CellBuilder bordered value="ACTION" />
			</TableRow>
		</TableHead>
	);
};

export default KpiStaffTableHead;
