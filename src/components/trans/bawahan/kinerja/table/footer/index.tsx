import CellBuilder from "@components/commons/table/cell.builder";
import {
	hitungTotalBobot,
	hitungTotalNilaiProdukKerja,
	hitungTotalNilaiWaktu,
} from "@helper/nilaiKinerja";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TransKpiWithAudit } from "@myTypes/entity/trans.kpi";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useQueryClient } from "@tanstack/react-query";

const DetailKpiBawahanTableFooter = () => {
	const periode = useTransKpiStore((state) => state.periode);
	const { nipamStaff, bridgeKpiBawahan } = useTransKinerjaStore();
	const qc = useQueryClient();
	const data = qc.getQueryData<TransKpiWithAudit>([
		"trans.kpi.bawahan",
		{
			nipam: nipamStaff,
			kpiId: bridgeKpiBawahan?.kpi.id,
			periode: periode?.periode,
		},
	]);

	if (!data)
		return (
			<TableFooter>
				<TableRow>
					<CellBuilder colSpan={7} align="right" value="Total" />
					<CellBuilder value={0} />
					<CellBuilder colSpan={5} value="" bordered />
					<CellBuilder value={0} />
					<CellBuilder value="" bordered />
				</TableRow>
			</TableFooter>
		);

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
					value={hitungTotalBobot(data.indikatorList)}
					align="right"
					bordered
					percent
					sx={{ fontWeight: "bold" }}
				/>
				<CellBuilder colSpan={3} value="" bordered />
				<CellBuilder
					value={hitungTotalNilaiProdukKerja(data.indikatorList)}
					bordered
					percent
					align="right"
					sx={{ fontWeight: "bold" }}
				/>
				<CellBuilder
					value={hitungTotalNilaiWaktu(data.indikatorList)}
					bordered
					percent
					align="right"
					sx={{ fontWeight: "bold" }}
				/>
				<CellBuilder
					value={data.nilaiTotal}
					bordered
					percent
					sx={{ fontWeight: "bold" }}
				/>
				<CellBuilder value="" bordered />
			</TableRow>
		</TableFooter>
	);
};

export default DetailKpiBawahanTableFooter;
