import { KpiWithAudit } from "@myTypes/entity/kpi";
import { useIndikatorStore } from "@store/filter/master/indikator";
import { useKpiStore } from "@store/filter/master/kpi";
import dynamic from "next/dynamic";

const KpiItemSummary = dynamic(() => import("./summary"));
const IndikatorComponent = dynamic(
	() => import("@components/master/indikator")
);
const ExpandMoreIcon = dynamic(() => import("@mui/icons-material/ExpandMore"));
const Accordion = dynamic(() => import("@mui/material/Accordion"));
const AccordionDetails = dynamic(
	() => import("@mui/material/AccordionDetails")
);
const AccordionSummary = dynamic(
	() => import("@mui/material/AccordionSummary")
);
const Divider = dynamic(() => import("@mui/material/Divider"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));

type KpiAccordionItemProps = {
	kpi: KpiWithAudit;
	urut: number;
};

const KpiAccordionItem = (props: KpiAccordionItemProps) => {
	const { kpi, urut } = props;
	const { expanded, setExpanded } = useKpiStore();
	const { setKeyVal } = useIndikatorStore();

	const expandHandler = () => {
		setKeyVal("kpiId", kpi.id);
		setExpanded(expanded === `panel${kpi.id}` ? false : `panel${kpi.id}`);
	};

	return (
		<Accordion expanded={expanded === `panel${kpi.id}` ? true : false}>
			<AccordionSummary
				expandIcon={
					<IconButton onClick={expandHandler}>
						<ExpandMoreIcon />
					</IconButton>
				}
				aria-controls={`panel${kpi.id}-content`}
				id={`panel${kpi.id}-header`}
			>
				<KpiItemSummary kpi={kpi} urut={urut} />
			</AccordionSummary>
			<Divider />
			<AccordionDetails sx={{ p: 0 }}>
				{expanded === `panel${kpi.id}` ? <IndikatorComponent /> : null}
			</AccordionDetails>
		</Accordion>
	);
};

export default KpiAccordionItem;
