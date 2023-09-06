import dynamic from "next/dynamic";

const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const TableHead = dynamic(() => import("@mui/material/TableHead"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));

const TransPerilakuTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<CellBuilder value="No" bordered />
				<CellBuilder value="Kompetensi" bordered />
				<CellBuilder value="Uraian" bordered />
				<CellBuilder value="Indikator Perilaku" bordered />
				<CellBuilder value="Nilai" bordered />
				<CellBuilder value="Action" bordered />
			</TableRow>
		</TableHead>
	);
};

export default TransPerilakuTableHead;
