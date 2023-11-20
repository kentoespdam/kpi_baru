import CellBuilder from "@components/commons/table/cell.builder";
import { hitungTotalNilaiPerilaku } from "@helper/nilaiIndikator";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { TransPerilaku } from "@myTypes/entity/trans.perilaku";
import { useQueryClient } from "@tanstack/react-query";
import { KpiAdminPerilakuProps } from "../..";

const KpiAdminPerilakuTableFooter = (props: KpiAdminPerilakuProps) => {
	const { nipam, periode, levelId } = props;
	const qc = useQueryClient();
	const data = qc.getQueryData<TransPerilaku>([
		"kpi.admin.perilaku",
		{
			nipam: nipam,
			periode: periode?.periode,
			levelId: levelId,
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

export default KpiAdminPerilakuTableFooter;
