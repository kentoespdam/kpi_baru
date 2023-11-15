import TableLoading from "@components/commons/table/loading";
import DetailKpiBawahanTableHead from "@components/trans/bawahan/kinerja/table/head";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { TransKpi, TransKpiQKeyProps } from "@myTypes/entity/trans.kpi";
import { useQueryClient } from "@tanstack/react-query";
import KpiAdminTableBody from "./table/body";
import KpiAdminTableFooter from "./table/footer";

type KpiAdminKpiProps = {
	queryKeyKpi: (string | TransKpiQKeyProps)[];
};
const KpiAdminKpi = (props: KpiAdminKpiProps) => {
	const { queryKeyKpi } = props;
	const { nipam, kpiId } = queryKeyKpi[1] as TransKpiQKeyProps;
	const qc = useQueryClient();

	const data = qc.getQueryData<TransKpi>(queryKeyKpi);

	return (
		<>
			<TableContainer>
				<Table>
					<DetailKpiBawahanTableHead />
					{!data ? (
						<TableLoading colSpan={14} error />
					) : (
						<KpiAdminTableBody
							transKpi={data}
							nipam={nipam!}
							idKpi={kpiId!}
						/>
					)}
					<KpiAdminTableFooter transKpi={data} />
				</Table>
			</TableContainer>
		</>
	);
};

export default KpiAdminKpi;
