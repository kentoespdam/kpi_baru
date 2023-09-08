import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import TransKpiStaffUploadComponent from "@components/trans/kpi/staff/upload";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { useViewUploadDialogStore } from "@store/dialog/view.upload";
import dynamic from "next/dynamic";
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));

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
