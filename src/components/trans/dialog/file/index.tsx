import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import TransKpiFileListComponent from "@components/trans/kpi/staff/file";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { TransKpiQKeyProps } from "@myTypes/entity/trans.kpi";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import dynamic from "next/dynamic";
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));

type ViewFileDialogProps = {
	qKeyKpiStaff: (string | TransKpiQKeyProps)[];
	isAdmin?: boolean;
};
const ViewFileDialog = (props: ViewFileDialogProps) => {
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
				<TransKpiFileListComponent
					uraianId={idUraian}
					qKeyKpiStaff={props.qKeyKpiStaff}
				/>
			</DialogContent>
		</Dialog>
	) : null;
};

export default ViewFileDialog;
