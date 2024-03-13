import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import ViewPdfComponent from "@components/trans/view/pdf";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import { useViewPdfDialogStore } from "@store/dialog/view.pdf";
import dynamic from "next/dynamic";
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));

const ViewPdfDialog = () => {
	const toggleViewOpen = useViewFileDialogStore(
		(state) => state.toggleViewOpen
	);
	const { isViewPdfOpen, toggleViewPdfOpen, fileId } =
		useViewPdfDialogStore();

	const handleClick = () => {
		toggleViewOpen();
		toggleViewPdfOpen();
	};

	return fileId ? (
		<Dialog
			fullScreen
			open={isViewPdfOpen}
			onClose={handleClick}
			TransitionComponent={DialogSlideTransition}
		>
			<DialogContent sx={{ px: 4, py: 1 }}>
				<DialogActions>
					<IconButton
						edge="start"
						onClick={handleClick}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				</DialogActions>
				<ViewPdfComponent id={fileId} />
			</DialogContent>
		</Dialog>
	) : null;
};

export default ViewPdfDialog;
