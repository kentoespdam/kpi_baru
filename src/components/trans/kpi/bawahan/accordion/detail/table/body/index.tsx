import TableBody from "@mui/material/TableBody";
import { TransKpiWithAudit } from "@myTypes/entity/trans.kpi";
import { useTransKpiBawahanStore } from "@store/filter/trans/bawahan";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useQueryClient } from "@tanstack/react-query";
import DetailKpiBawahanIndikator from "./indikator";

const DetailKpiBawahanTableBody = () => {
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

	if (!data) return null;
	let urut = 1;
	return (
		<TableBody>
			{data.indikatorList.map((row) => (
				<DetailKpiBawahanIndikator
					key={row.id}
					urut={urut++}
					nipamStaff={nipamStaff}
					indikator={row}
				/>
			))}
		</TableBody>
	);
};

export default DetailKpiBawahanTableBody;
