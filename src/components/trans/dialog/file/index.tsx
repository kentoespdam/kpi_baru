import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import TransKpiFileListComponent from "@components/trans/kpi/staff/file";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import dynamic from "next/dynamic";
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));

const ViewFileDialog = () => {
	const { isViewOpen, toggleViewOpen, idUraian } = useViewFileDialogStore();

	return idUraian ? (
		<Dialog
			fullScreen
			open={isViewOpen}
			onClose={toggleViewOpen}
			TransitionComponent={DialogSlideTransition}
		>
			<DialogContent sx={{ px: 4, py: 1 }}>
				<DialogActions>
					<IconButton
						edge="start"
						onClick={toggleViewOpen}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				</DialogActions>
				<TransKpiFileListComponent uraianId={idUraian} />
			</DialogContent>
		</Dialog>
	) : null;
};

export default ViewFileDialog;
