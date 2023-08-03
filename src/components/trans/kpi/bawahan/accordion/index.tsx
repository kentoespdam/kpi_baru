import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { DetEmployee } from "@myTypes/entity/det.employee";
import { useSessionStore } from "@store/main/session";
import { useQueryClient } from "@tanstack/react-query";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTransKpiBawahanStore } from "@store/filter/trans/bawahan";
import IconButton from "@mui/material/IconButton";
import KpiBawahanAccordionDetail from "./detail";

const findStaff = (staffList: DetEmployee, nipam: string) => {
	if (staffList.staff === undefined) return null;
	return staffList.staff.find((item) => item.nipam === nipam);
};

type BawahanAccordionComponentProps = {
	staffNipam: string;
};

const BawahanAccordionComponent = (props: BawahanAccordionComponentProps) => {
	const { staffNipam } = props;
	const { expanded, setExpanded, setNipamStaff } = useTransKpiBawahanStore();
	const curNipam = useSessionStore.getState().user?.userId;
	const qc = useQueryClient();
	const data = qc.getQueryData<DetEmployee>(["employee-detail", curNipam]);

	if (data?.staff === undefined) return null;
	const currStaff = findStaff(data, staffNipam);

	const expandHandler = () => {
		setNipamStaff(
			expanded === `panel${staffNipam}` ? null : currStaff!.nipam
		);
		setExpanded(
			expanded === `panel${staffNipam}` ? false : `panel${staffNipam}`
		);
	};

	return (
		<Accordion expanded={expanded === `panel${staffNipam}` ? true : false}>
			<AccordionSummary
				expandIcon={
					<IconButton onClick={expandHandler}>
						<ExpandMoreIcon />
					</IconButton>
				}
			>
				<Stack
					direction="row"
					spacing={1}
					justifyContent="space-between"
				>
					<Stack direction="column">
						<Typography variant="body1">
							{currStaff?.nama}
						</Typography>
						<Typography variant="subtitle2" color="text.secondary">
							{currStaff?.nipam}
						</Typography>
					</Stack>
					<Typography variant="body2" color="text.secondary">
						{currStaff?.position?.name}
					</Typography>
				</Stack>
			</AccordionSummary>
			{expanded ? (
				<KpiBawahanAccordionDetail currStaff={currStaff!} />
			) : null}
		</Accordion>
	);
};

export default BawahanAccordionComponent;
