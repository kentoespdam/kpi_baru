import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import TransKpiFileListComponent from "@components/trans/kpi/staff/file";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { useViewFileDialogStore } from "@store/dialog/view.file";

const ViewFileDialog = () => {
	const { isViewOpen, toggleViewOpen, idIndikator, idUraian } =
		useViewFileDialogStore();

	return idIndikator && idUraian ? (
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
				<TransKpiFileListComponent
					indikatorId={idIndikator}
					uraianId={idUraian}
				/>
			</DialogContent>
		</Dialog>
	) : null;
};

export default ViewFileDialog;
