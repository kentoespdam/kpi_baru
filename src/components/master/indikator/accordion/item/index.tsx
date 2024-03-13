import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { IndikatorWithAudit } from "@myTypes/entity/indikator";
import { useIndikatorStore } from "@store/filter/master/indikator";
import { useUraianStore } from "@store/filter/master/uraian";
import dynamic from "next/dynamic";
import IndikatorItemSummary from "./summary";
const UraianComponents = dynamic(() => import("@components/master/uraian"));
const ExpandMoreIcon = dynamic(() => import("@mui/icons-material/ExpandMore"));

type IndikatorAccordionItemProps = {
	indikatorWithAudit: IndikatorWithAudit;
};
const IndikatorAccordionItem = (props: IndikatorAccordionItemProps) => {
	const { indikatorWithAudit } = props;
	const { expanded, setExpanded } = useIndikatorStore();
	const setKeyVal = useUraianStore((state) => state.setKeyVal);

	const expandHandler = () => {
		setKeyVal("indikatorId", indikatorWithAudit.id);
		setKeyVal("kpiId", indikatorWithAudit.kpi!.id);
		setExpanded(
			expanded === `panel-indikator${indikatorWithAudit.id}`
				? false
				: `panel-indikator${indikatorWithAudit.id}`
		);
	};

	return (
		<Accordion
			expanded={
				expanded === `panel-indikator${indikatorWithAudit.id}`
					? true
					: false
			}
		>
			<AccordionSummary
				expandIcon={
					<IconButton onClick={expandHandler}>
						<ExpandMoreIcon />
					</IconButton>
				}
			>
				<IndikatorItemSummary
					indikatorWithAudit={indikatorWithAudit}
					urut={indikatorWithAudit.urut}
				/>
			</AccordionSummary>
			<AccordionDetails>
				<Collapse
					in={
						expanded === `panel-indikator${indikatorWithAudit.id}`
							? true
							: false
					}
					unmountOnExit
				>
					<UraianComponents />
				</Collapse>
			</AccordionDetails>
		</Accordion>
	);
};

export default IndikatorAccordionItem;
