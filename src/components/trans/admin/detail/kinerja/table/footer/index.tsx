import { useQueryClient } from "@tanstack/react-query";
import { KpiAdminKinerjaProps } from "../..";
import { TransKpi } from "@myTypes/entity/trans.kpi";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import CellBuilder from "@components/commons/table/cell.builder";
import {
	hitungTotalBobot,
	hitungTotalNilaiProdukKerja,
	hitungTotalNilaiWaktu,
} from "@helper/nilaiKinerja";

const KpiAdminKinerjaTableFooter = (props: KpiAdminKinerjaProps) => {
	const { nipam, kpiId, periode } = props;
	const qc = useQueryClient();
	const data = qc.getQueryData<TransKpi>([
		"kpi.admin.kinerja",
		{ nipam: nipam, kpiId: kpiId, periode: periode?.periode },
	]);
	if (!data)
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
						value={0}
						align="right"
						bordered
						percent
						sx={{ fontWeight: "bold" }}
					/>
					<CellBuilder colSpan={3} value="" bordered />
					<CellBuilder
						value={0}
						bordered
						percent
						align="right"
						sx={{ fontWeight: "bold" }}
					/>
					<CellBuilder
						value={0}
						bordered
						percent
						align="right"
						sx={{ fontWeight: "bold" }}
					/>
					<CellBuilder
						value={0}
						bordered
						percent
						sx={{ fontWeight: "bold" }}
					/>
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

export default KpiAdminKinerjaTableFooter;
