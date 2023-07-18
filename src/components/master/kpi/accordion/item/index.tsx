import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { KpiWithAudit } from "@myTypes/entity/kpi";
import { useKpiStore } from "@store/filter/master/kpi";
import { shallow } from "zustand/shallow";
import KpiItemSummary from "./summary";
import IndikatorComponent from "@components/master/indikator";
import { useIndikatorStore } from "@store/filter/master/indikator";

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
