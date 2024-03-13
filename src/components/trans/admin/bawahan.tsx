import { DetEmployee } from "@myTypes/entity/det.employee";
import { useKpiAdminStore } from "@store/filter/trans/kpi.admin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import KpiAdminDetail from "./detail";
import KpiAdminBiodata from "./detail/biodata";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Periode } from "@helper/periode";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import { getEmpDetails } from "@utils/eo/employee";

type KpiAdminBawahanChild = {
	nipam: string | null;
	periode: Periode | null;
	bridgeKpi: BridgeKpi | null;
};
const KpiAdminBawahanChild = (props: KpiAdminBawahanChild) => {
	return (
		<>
			<Card>
				<CardContent>
					<KpiAdminBiodata nipam={props.nipam} />
					<Divider />
					<KpiAdminDetail
						periode={props.periode}
						bridgeKpi={props.bridgeKpi}
					/>
				</CardContent>
			</Card>
			<KpiAdminBawahan nipam={props.nipam} />
		</>
	);
};

type KpiAdminBawahanProps = {
	nipam: string | null;
};
const KpiAdminBawahan = (props: KpiAdminBawahanProps) => {
	const { bridgeKpiList, periode } = useKpiAdminStore();
	const { isLoading, isFetching, data, error } = useQuery<DetEmployee>({
		queryKey: ["kpi.admin.biodata", props.nipam],
		queryFn: getEmpDetails,
		enabled: !!props.nipam,
	});

	if (isLoading || isFetching) return <>Loading data...</>;
	return data?.staff?.map((emp) => {
		const bridge = bridgeKpiList.find((b) => b.nipam === emp.nipam) ?? null;
		return (
			<KpiAdminBawahanChild
				key={emp.nipam}
				nipam={emp.nipam}
				periode={periode}
				bridgeKpi={bridge}
			/>
		);
	});
};

export default KpiAdminBawahan;
