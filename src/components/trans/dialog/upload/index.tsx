import { DialogSlideTransition } from "@components/commons/effect/transition/dialog";
import { useTheme } from "@mui/material/styles";
import { useViewUploadDialogStore } from "@store/dialog/view.upload";
import dynamic from "next/dynamic";

const TransKpiStaffUploadComponent = dynamic(
	() => import("@components/trans/kpi/staff/upload")
);
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));
const Card = dynamic(() => import("@mui/material/Card"));
const CardContent = dynamic(() => import("@mui/material/CardContent"));
const CardHeader = dynamic(() => import("@mui/material/CardHeader"));
const Dialog = dynamic(() => import("@mui/material/Dialog"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));

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
