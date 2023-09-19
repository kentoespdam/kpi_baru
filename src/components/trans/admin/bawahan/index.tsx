import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Employee } from "@myTypes/entity/employee";
import { useKpiAdminBawahanStore } from "@store/filter/trans/kpi.admin.bawahan";
import dynamic from "next/dynamic";
import KpiAdminBawahanDetails from "./details";
const ExpandMoreIcon = dynamic(() => import("@mui/icons-material/ExpandMore"));

type KpiAdminBawahanProps = {
	employee: Employee;
};
const KpiAdminBawahan = (props: KpiAdminBawahanProps) => {
	const { employee } = props;
	const nipam = employee.nipam;
	const { expanded, setExpanded } = useKpiAdminBawahanStore();

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
				<KpiAdminBawahanDetails nipam={nipam} />
			) : null}
		</Accordion>
	);
};

export default KpiAdminBawahan;
