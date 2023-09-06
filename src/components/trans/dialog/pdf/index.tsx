import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import DialogContent from "@mui/material/DialogContent";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import { useViewPdfDialogStore } from "@store/dialog/view.pdf";
import dynamic from "next/dynamic";

const ViewPdfComponent = dynamic(() => import("@trans/view/pdf/index"));
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));
const Dialog = dynamic(() => import("@mui/material/Dialog"));
const DialogActions = dynamic(() => import("@mui/material/DialogActions"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));

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
