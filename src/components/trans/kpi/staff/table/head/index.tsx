import dynamic from "next/dynamic";

const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const TableHead = dynamic(() => import("@mui/material/TableHead"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));

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
