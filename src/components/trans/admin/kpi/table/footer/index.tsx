import CellBuilder from "@components/commons/table/cell.builder";
import {
	hitungTotalBobot,
	hitungTotalNilaiProdukKerja,
	hitungTotalNilaiWaktu,
} from "@helper/nilaiKinerja";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import { TransKpi } from "@myTypes/entity/trans.kpi";

type KpiAdminTableFooterProps = {
	transKpi?: TransKpi;
};
const KpiAdminTableFooter = (props: KpiAdminTableFooterProps) => {
	const { transKpi } = props;

	return (
		<TableFooter>
			<TableRow>
				<CellBuilder
					colSpan={6}
					align="right"
					value="Total"
					bordered
					sx={{ fontWeight: "bold" }}
				/>
				<CellBuilder
					value={hitungTotalBobot(transKpi?.indikatorList)}
					align="right"
					bordered
					percent
					sx={{ fontWeight: "bold" }}
				/>
				<CellBuilder colSpan={3} value="" bordered />
				<CellBuilder
					value={hitungTotalNilaiProdukKerja(transKpi?.indikatorList)}
					bordered
					percent
					align="right"
					sx={{ fontWeight: "bold" }}
				/>
				<CellBuilder
					value={hitungTotalNilaiWaktu(transKpi?.indikatorList)}
					bordered
					percent
					align="right"
					sx={{ fontWeight: "bold" }}
				/>
				<CellBuilder
					value={transKpi?.nilaiTotal}
					bordered
					percent
					sx={{ fontWeight: "bold" }}
				/>
				<CellBuilder value="" bordered />
			</TableRow>
		</TableFooter>
	);
};

export default KpiAdminTableFooter;
