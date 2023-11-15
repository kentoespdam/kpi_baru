import { useQueryClient } from "@tanstack/react-query";
import { KpiAdminKinerjaProps } from "../..";
import { TransKpi } from "@myTypes/entity/trans.kpi";
import TableBody from "@mui/material/TableBody";
import KpiAdminKinerjaTableBodyIndikator from "./indikator";

const KpiAdminKinerjaTableBody = (props: KpiAdminKinerjaProps) => {
	const { nipam, kpiId, periode } = props;
	const qc = useQueryClient();
	const data = qc.getQueryData<TransKpi>([
		"kpi.admin.kinerja",
		{ nipam: nipam, kpiId: kpiId, periode: periode?.periode },
	]);
	if (!data || !nipam) return null;
	let urut = 1;
	return (
		<TableBody>
			{data.indikatorList.map((row) => (
				<KpiAdminKinerjaTableBodyIndikator
					key={row.id}
					urut={urut++}
					nipam={nipam}
					indikator={row}
					idKpi={Number(data.id)}
					lockedStatus={data.lockedStatus}
				/>
			))}
		</TableBody>
	);
};

export default KpiAdminKinerjaTableBody;
