import { useViewUploadDialogStore } from "@store/dialog/view.upload";
import dynamic from "next/dynamic";

const UploadIcon = dynamic(() => import("@mui/icons-material/Upload"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const Tooltip = dynamic(() => import("@mui/material/Tooltip"));

type UploadBtnProps = {
	uraianId: number;
};

const UploadBtn = (props: UploadBtnProps) => {
	const { uraianId } = props;
	const { toggleViewUploadOpen, setUploadUraianId } =
		useViewUploadDialogStore();

	const handleClick = () => {
		setUploadUraianId(uraianId);
		toggleViewUploadOpen();
	};

	return (
		<Tooltip title="Upload Laporan" placement="top" followCursor>
			<IconButton color="warning" size="small" onClick={handleClick}>
				<UploadIcon />
			</IconButton>
		</Tooltip>
	);
};

export default UploadBtn;
