import { hitungTotalNilaiPerilaku } from "@helper/nilaiIndikator";
import { TransPerilaku } from "@myTypes/entity/trans.perilaku";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useTransPerilakuStore } from "@store/filter/trans/perilaku";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const TableRow = dynamic(() => import("@mui/material/TableRow"));
const TableFooter = dynamic(() => import("@mui/material/TableFooter"));
const Typography = dynamic(() => import("@mui/material/Typography"));

const TransPerilakuTableFooter = () => {
	const periode = useTransKpiStore((state) => state.periode);
	const nipamStaff = useTransKinerjaStore((state) => state.nipamStaff);
	const levelStaff = useTransPerilakuStore((state) => state.levelStaff);

	const qc = useQueryClient();
	const data = qc.getQueryData<TransPerilaku>([
		"trans.perilaku.bawahan",
		{
			nipam: nipamStaff,
			periode: periode?.periode,
			levelId: levelStaff,
		},
	]);

	return (
		<TableFooter>
			<TableRow>
				<CellBuilder colSpan={4} bordered>
					<Typography variant="subtitle1" align="right">
						<strong>Total Nilai Perilaku</strong>
					</Typography>
				</CellBuilder>
				<CellBuilder bordered>
					<Typography variant="subtitle1" align="right">
						<strong>
							{!data
								? 0
								: hitungTotalNilaiPerilaku(data.perilakuList)}
						</strong>
					</Typography>
				</CellBuilder>
				<CellBuilder value="" bordered />
			</TableRow>
		</TableFooter>
	);
};

export default TransPerilakuTableFooter;
