import { Periode } from "@helper/periode";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { AcceptedStatus } from "@myTypes/index";
import KpiAdminPerilakuTableBody from "./table/body";
import KpiAdminPerilakuTableFooter from "./table/footer";
import KpiAdminPerilakuTableHead from "./table/head";

export type KpiAdminPerilakuProps = {
	nipam?: string;
	periode: Periode | null;
	levelId?: number;
	lockStatus?: AcceptedStatus;
};
const KpiAdminPerilaku = (props: KpiAdminPerilakuProps) => {
	const { nipam, periode, levelId, lockStatus } = props;

	return (
		<TableContainer>
			<Table>
				<KpiAdminPerilakuTableHead />
				<KpiAdminPerilakuTableBody
					nipam={nipam}
					periode={periode}
					levelId={levelId}
					lockStatus={lockStatus}
				/>
				<KpiAdminPerilakuTableFooter
					nipam={nipam}
					periode={periode}
					levelId={levelId}
				/>
			</Table>
		</TableContainer>
	);
};

export default KpiAdminPerilaku;
