import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import TransKpiFileListComponent from "@trans/kpi/staff/file";

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
