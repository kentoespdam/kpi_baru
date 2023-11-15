import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Employee } from "@myTypes/entity/employee";
import { useKpiAdminBawahanStore } from "@store/filter/trans/kpi.admin.bawahan";
import dynamic from "next/dynamic";
import KpiAdminBawahanDetails from "./details";
import { useQueryClient } from "@tanstack/react-query";
import { BridgeKpi } from "@myTypes/entity/bridge.kpi";
import KpiAdminTab from "../tabs";
import { Periode } from "@helper/periode";
import { DetEmployee } from "@myTypes/entity/det.employee";
const ExpandMoreIcon = dynamic(() => import("@mui/icons-material/ExpandMore"));

type KpiAdminBawahanProps = {
	employee: Employee;
	periode: Periode | null;
};
const KpiAdminBawahan = (props: KpiAdminBawahanProps) => {
	const { employee, periode } = props;
	const nipam = employee.nipam;
	const { expanded, setExpanded } = useKpiAdminBawahanStore();
	const qc = useQueryClient();
	const bridge = qc.getQueryData<BridgeKpi[]>(["bridge-kpi.autocomplete"]);
	if (bridge === undefined || bridge.length === 0) return null;
	const filtered = bridge.filter((b) => b.nipam === nipam)[0];
	const biodata = qc.getQueryData<DetEmployee>([
		"kpi-admin-biodata",
		filtered?.nipam,
	]);
	console.log(biodata);

	const expandHandler = () => {
		setExpanded(expanded === `panel-${nipam}` ? false : `panel-${nipam}`);
	};

	return (
		<Accordion expanded={expanded === `panel-${nipam}`}>
			<AccordionSummary
				expandIcon={
					<IconButton onClick={expandHandler}>
						<ExpandMoreIcon />
					</IconButton>
				}
			>
				<Stack direction="row" spacing={1}>
					<Typography variant="subtitle1">{employee.nama}</Typography>
					<Typography variant="subtitle2">
						{employee.position.name}
					</Typography>
				</Stack>
			</AccordionSummary>
			{expanded === `panel-${nipam}` ? (
				// <KpiAdminBawahanDetails nipam={nipam} />
				<KpiAdminTab periode={periode} bridgeKpi={filtered} />
			) : null}
		</Accordion>
	);
};

export default KpiAdminBawahan;
