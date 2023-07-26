import CellBuilder from "@components/commons/table/cell.builder";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const KpiStaffTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<CellBuilder value="NO" />
				<CellBuilder value="INDIKATOR KINJERJA KUNCI (KPI)" />
				<CellBuilder value="PENJELASAN / RUMUSAN KPI" />
				<CellBuilder value="STATUS" />
				<CellBuilder value="ACTION" />
			</TableRow>
		</TableHead>
	);
};

export default KpiStaffTableHead;
