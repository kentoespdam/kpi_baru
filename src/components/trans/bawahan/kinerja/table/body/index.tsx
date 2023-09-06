import { TransKpiWithAudit } from "@myTypes/entity/trans.kpi";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const TableBody = dynamic(() => import("@mui/material/TableBody"));
const DetailKpiBawahanIndikator = dynamic(() => import("./indikator"));

const DetailKpiBawahanTableBody = () => {
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
					idKpi={Number(bridgeKpiBawahan?.kpi.id)}
				/>
			))}
		</TableBody>
	);
};

export default DetailKpiBawahanTableBody;
