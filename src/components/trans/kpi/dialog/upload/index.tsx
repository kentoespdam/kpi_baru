import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import TransKpiStaffUploadComponent from "@components/trans/kpi/staff/upload";
import { useViewUploadDialogStore } from "@store/dialog/view.upload";
import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Tooltip from "@mui/material/Tooltip";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";

const ViewUploadDialog = () => {
	const { isViewUploadOpen, toggleViewUploadOpen, uploadUraianId } =
		useViewUploadDialogStore();
	const theme = useTheme();

	return uploadUraianId ? (
		<Dialog
			open={isViewUploadOpen}
			onClose={toggleViewUploadOpen}
			TransitionComponent={DialogSlideTransition}
		>
			<Card>
				<CardHeader
					title="Upload File KPI"
					action={
						<IconButton
							edge="start"
							onClick={toggleViewUploadOpen}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					}
					sx={{
						borderBottom: `1px solid ${theme.palette.divider}`,
						backgroundColor: theme.palette.success.main,
						color: theme.palette.success.contrastText,
					}}
				/>
				<CardContent>
					<TransKpiStaffUploadComponent uraianId={uploadUraianId} />
				</CardContent>
			</Card>
		</Dialog>
	) : null;
};

export default ViewUploadDialog;
