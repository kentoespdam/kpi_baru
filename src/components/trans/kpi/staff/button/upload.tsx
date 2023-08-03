import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import UploadIcon from "@mui/icons-material/Upload";
import Link from "next/link";
import { useViewUploadDialogStore } from "@store/dialog/view.upload";

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
