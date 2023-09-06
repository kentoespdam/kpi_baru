import { IndikatorWithAudit } from "@myTypes/entity/indikator";
import { useIndikatorStore } from "@store/filter/master/indikator";
import { useUraianStore } from "@store/filter/master/uraian";
import dynamic from "next/dynamic";

const IndikatorItemSummary = dynamic(() => import("./summary"));
const UraianComponents = dynamic(() => import("@components/master/uraian"));
const ExpandMoreIcon = dynamic(() => import("@mui/icons-material/ExpandMore"));
const Accordion = dynamic(() => import("@mui/material/Accordion"));
const AccordionDetails = dynamic(
	() => import("@mui/material/AccordionDetails")
);
const AccordionSummary = dynamic(
	() => import("@mui/material/AccordionSummary")
);
const Collapse = dynamic(() => import("@mui/material/Collapse"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));

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
