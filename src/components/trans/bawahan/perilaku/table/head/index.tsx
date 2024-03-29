import CellBuilder from "@components/commons/table/cell.builder";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TransPerilakuTableHead = () => {
	return (
		<TableHead>
			<TableRow>
				<CellBuilder value="No" bordered/>
				<CellBuilder value="Kompetensi" bordered/>
				<CellBuilder value="Uraian" bordered/>
				<CellBuilder value="Indikator Perilaku" bordered/>
				<CellBuilder value="Nilai" bordered/>
				<CellBuilder value="Action" bordered/>
			</TableRow>
		</TableHead>
	);
};

export default TransPerilakuTableHead;
