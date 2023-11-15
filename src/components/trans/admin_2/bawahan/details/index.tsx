import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";
import { useQuery } from "@tanstack/react-query";
import KpiAdminTab from "@trans/admin/tabs";
import { getBridgeKpi } from "@utils/trans/kpi";
type KpiAdminBawahanDetailsProps = {
	nipam: string;
};
const KpiAdminBawahanDetails = (props: KpiAdminBawahanDetailsProps) => {
	const { nipam } = props;
	const periode = useKpiAdminStore((state) => state.periode);
	const { isFetching, data, error } = useQuery<BridgeKpi>({
		queryKey: ["trans.kpi.bawahan.bridge", nipam],
		queryFn: getBridgeKpi,
		enabled: !!nipam,
		retry: 2,
	});

	return isFetching ? (
		<LinearProgress />
	) : error || !data ? (
		<Alert severity="error">KPI Not Found!!!</Alert>
	) : (
		<KpiAdminTab periode={periode} bridgeKpi={data} />
	);
};

export default KpiAdminBawahanDetails;
