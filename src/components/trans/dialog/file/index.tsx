import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import DialogContent from "@mui/material/DialogContent";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import dynamic from "next/dynamic";

const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));
const Dialog = dynamic(() => import("@mui/material/Dialog"));
const DialogActions = dynamic(() => import("@mui/material/DialogActions"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const TransKpiFileListComponent = dynamic(
	() => import("@trans/kpi/staff/file")
);

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
