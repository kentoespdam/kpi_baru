import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useViewUploadDialogStore } from "@store/dialog/view.upload";
import dynamic from "next/dynamic";

const UploadIcon = dynamic(() => import("@mui/icons-material/Upload"));

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
