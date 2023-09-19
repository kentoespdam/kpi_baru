import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import KpiKinerjaForm from "@components/trans/bawahan/kinerja/form";
import { Periode } from "@helper/periode";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useViewFormKinerjaDialogStore } from "@store/dialog/view.form.kinerja";
import dynamic from "next/dynamic";
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));

const ViewFormKinerjaDialog = (props: {
	periode: Periode | null;
	isAdmin?: boolean;
}) => {
	const {
		staffNipam,
		idKpi,
		idUraian,
		isFormKinerjaOpen: isFormOpen,
		toggleFormKinerjaOpen: toggleFormOpen,
	} = useViewFormKinerjaDialogStore();
	return (
		<Dialog
			open={isFormOpen}
			onClose={toggleFormOpen}
			TransitionComponent={DialogSlideTransition}
			maxWidth="md"
		>
			<DialogTitle>
				Form Kinerja Staff
				<IconButton
					edge="start"
					onClick={toggleFormOpen}
					aria-label="close"
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<KpiKinerjaForm
					staffNipam={staffNipam!}
					idKpi={idKpi!}
					idUraian={idUraian!}
					periode={props.periode}
					isAdmin={props.isAdmin}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default ViewFormKinerjaDialog;
