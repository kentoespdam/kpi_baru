import { findStaff } from "@helper/employee";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DetEmployee } from "@myTypes/entity/det.employee";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useSessionStore } from "@store/main/session";
import { useQueryClient } from "@tanstack/react-query";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { useTemplateStore } from "@store/main/template";
import { Suspense, lazy } from "react";

const TransKpiBawahanTabs = lazy(
	() => import("@components/trans/bawahan/accordion/tabs")
);

type AccordionBawahanProps = {
	staffNipam: string;
};
const AccordionBawahan = (props: AccordionBawahanProps) => {
	const { staffNipam } = props;
	const { expanded, setExpanded, setNipamStaff } = useTransKinerjaStore();
	const curNipam = useSessionStore.getState().user?.userId;
	const isDesktop = useTemplateStore((state) => state.isDesktop);
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
					direction={isDesktop ? "row" : "column"}
					spacing={1}
					justifyContent="space-arround"
				>
					<Stack direction="column">
						<Typography variant="body1">
							{currStaff?.nama}
						</Typography>
						<Typography variant="subtitle2" color="text.secondary">
							{currStaff?.nipam}
						</Typography>
					</Stack>

					<Box>
						<Typography variant="body2" color="text.secondary">
							{currStaff?.position?.name}
						</Typography>
					</Box>
				</Stack>
			</AccordionSummary>
			{expanded ? (
				<Suspense fallback={<>Loading view...</>}>
					<TransKpiBawahanTabs />
				</Suspense>
			) : null}
		</Accordion>
	);
};

export default AccordionBawahan;
