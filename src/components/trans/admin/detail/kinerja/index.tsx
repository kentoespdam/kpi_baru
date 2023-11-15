import { Periode } from "@helper/periode";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { TransKpi } from "@myTypes/entity/trans.kpi";
import { useQueryClient } from "@tanstack/react-query";
import KpiAdminKinerjaTableHead from "./table/header";
import KpiAdminKinerjaTableFooter from "./table/footer";
import KpiAdminKinerjaTableBody from "./table/body";

export type KpiAdminKinerjaProps = {
	periode: Periode | null;
	nipam?: string;
	kpiId?: number;
};
const KpiAdminKinerja = (props: KpiAdminKinerjaProps) => {
	const { nipam, kpiId, periode } = props;
	const qc = useQueryClient();
	const data = qc.getQueryData<TransKpi>([
		"kpi.admin.kinerja",
		{ nipam: nipam, kpiId: kpiId, periode: periode?.periode },
	]);
	if (!data) return null;
	return (
		<TableContainer>
			<Table>
				<KpiAdminKinerjaTableHead />
				<KpiAdminKinerjaTableBody
					nipam={nipam}
					kpiId={kpiId}
					periode={periode}
				/>
				<KpiAdminKinerjaTableFooter
					nipam={nipam}
					kpiId={kpiId}
					periode={periode}
				/>
			</Table>
		</TableContainer>
	);
};

export default KpiAdminKinerja;
