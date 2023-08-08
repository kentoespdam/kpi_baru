import CellBuilder from "@components/commons/table/cell.builder";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TransKpiWithAudit } from "@myTypes/entity/trans.kpi";
import { useTransKpiBawahanStore } from "@store/filter/trans/bawahan";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useQueryClient } from "@tanstack/react-query";

const DetailKpiBawahanTableFooter = () => {
	const periode = useTransKpiStore((state) => state.periode);
	const { nipamStaff, bridgeKpiBawahan } = useTransKpiBawahanStore();
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
	const totalBobot = data.indikatorList
		.map((item) => item.uraianList.map((item2) => item2.bobot))
		.flat()
		.reduce((a, b) => a + b, 0);

	return (
		<TableHead>
			<TableRow>
				<CellBuilder colSpan={6} align="right" value="Total" bordered />
				<CellBuilder value={`${totalBobot}%`} align="right" bordered />
				<CellBuilder colSpan={5} value="" bordered />
				<CellBuilder value={data.nilaiTotal} bordered />
				<CellBuilder value="" bordered />
			</TableRow>
		</TableHead>
	);
};

export default DetailKpiBawahanTableFooter;
