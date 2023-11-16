import { Periode } from "@helper/periode";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
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
