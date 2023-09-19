import TableLoading from "@components/commons/table/loading";
import DetailKpiBawahanTableHead from "@components/trans/bawahan/kinerja/table/head";
import { Periode } from "@helper/periode";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import { useQueries } from "@tanstack/react-query";
import { getStaffKpi } from "@utils/trans/kpi";
import KpiAdminTableBody from "./table/body";
import KpiAdminTableFooter from "./table/footer";

type KpiAdminKpiProps = {
	periode: Periode | null;
	bridgeKpi: BridgeKpi | null;
};
const KpiAdminKpi = (props: KpiAdminKpiProps) => {
	const { periode, bridgeKpi } = props;

	const queries = useQueries({
		queries: [
			{
				queryKey: [
					"kpi.admin.kpi",
					{
						periode: periode?.periode,
						kpiId: bridgeKpi?.kpi.id,
						nipam: bridgeKpi?.nipam,
					},
				],
				queryFn: getStaffKpi,
				enabled: !!periode?.periode && !!bridgeKpi?.kpi.id,
			},
		],
	});

	const { isFetching, data, error } = queries[0];

	return (
		<>
			{isFetching ? <LinearProgress /> : null}
			<TableContainer>
				<Table>
					<DetailKpiBawahanTableHead />
					{isFetching ? (
						<TableLoading colSpan={14} />
					) : error || !data ? (
						<TableLoading colSpan={14} error />
					) : (
						<KpiAdminTableBody
							transKpi={data}
							nipam={bridgeKpi!.nipam}
							idKpi={bridgeKpi!.kpi.id}
						/>
					)}
					<KpiAdminTableFooter transKpi={data} />
				</Table>
			</TableContainer>
		</>
	);
};

export default KpiAdminKpi;
