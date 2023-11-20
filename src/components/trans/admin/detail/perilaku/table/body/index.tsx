import CellBuilder from "@components/commons/table/cell.builder";
import TableLoading from "@components/commons/table/loading";
import { indikatorPerilaku } from "@helper/nilaiIndikator";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { TransPerilaku } from "@myTypes/entity/trans.perilaku";
import { useQueryClient } from "@tanstack/react-query";
import { KpiAdminPerilakuProps } from "../..";
import PerilakuAction from "./action";

const KpiAdminPerilakuTableBody = (props: KpiAdminPerilakuProps) => {
	const { nipam, periode, levelId, lockStatus } = props;
	const qc = useQueryClient();
	const data = qc.getQueryData<TransPerilaku>([
		"kpi.admin.perilaku",
		{
			nipam: nipam,
			periode: periode?.periode,
			levelId: levelId,
		},
	]);

	let urut = 1;
	if (!data) return <TableLoading error colSpan={6} />;
	return (
		<TableBody>
			{data.perilakuList.map((row) => (
				<TableRow hover key={row.id}>
					<CellBuilder value={urut++} bordered />
					<CellBuilder value={row.kompetensi} width={200} bordered />
					<CellBuilder value={row.uraian} width={400} bordered />
					<CellBuilder
						value={indikatorPerilaku(row.nilai)}
						noWrap
						align="center"
						bordered
					/>
					<CellBuilder value={row.nilai} bordered />
					<PerilakuAction
						perilaku={row}
						nipam={nipam ?? null}
						levelId={levelId ?? null}
						lockStatus={lockStatus}
					/>
				</TableRow>
			))}
		</TableBody>
	);
};

export default KpiAdminPerilakuTableBody;
