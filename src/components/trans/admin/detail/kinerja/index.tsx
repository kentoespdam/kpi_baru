import TableLoading from "@components/commons/table/loading";
import { Periode } from "@helper/periode";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useQueryClient } from "@tanstack/react-query";
import KpiAdminKinerjaTableBody from "./table/body";
import KpiAdminKinerjaTableFooter from "./table/footer";
import KpiAdminKinerjaTableHead from "./table/header";

export type KpiAdminKinerjaProps = {
	periode: Periode | null;
	nipam?: string;
	kpiId?: number;
};
const KpiAdminKinerja = (props: KpiAdminKinerjaProps) => {
	const { nipam, kpiId, periode } = props;

	const qc = useQueryClient();
	const qstate = qc.getQueryState([
		"kpi.admin.kinerja",
		{ nipam: nipam, kpiId: kpiId, periode: periode?.periode },
	]);

	return (
		<TableContainer>
			<Table>
				<KpiAdminKinerjaTableHead />
				{qstate?.fetchStatus === "fetching" ? (
					<TableLoading colSpan={14} />
				) : qstate?.error ? (
					<TableLoading colSpan={14} error />
				) : (
					<KpiAdminKinerjaTableBody
						nipam={nipam}
						kpiId={kpiId}
						periode={periode}
					/>
				)}
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
