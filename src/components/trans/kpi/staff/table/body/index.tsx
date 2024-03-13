import TableBody from "@mui/material/TableBody";
import { TransKpiWithAudit } from "@myTypes/entity/trans.kpi";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useSessionStore } from "@store/main/session";
import { useQueryClient } from "@tanstack/react-query";
import TransKpiIndikatorComponent from "./indikator";

const KpiStaffTableBody = () => {
	const { periode, bridgeKpi } = useTransKpiStore((state) => ({
		periode: state.periode,
		bridgeKpi: state.bridgeKpi,
	}));
	const curNipam = useSessionStore.getState().user?.userId;
	const qc = useQueryClient();
	const data = qc.getQueryData<TransKpiWithAudit>([
		"trans.kpi.staff",
		{
			nipam: curNipam,
			kpiId: bridgeKpi?.kpi.id,
			periode: periode?.periode,
		},
	]);

	if (!data) return null;
	let urut = 1;
	return (
		<TableBody>
			{data.indikatorList.map((row) => (
				<TransKpiIndikatorComponent
					indikator={row}
					key={row.id}
					urut={urut++}
					lockedStatus={data.lockedStatus}
				/>
			))}
		</TableBody>
	);
};

export default KpiStaffTableBody;
