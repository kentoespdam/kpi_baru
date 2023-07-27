import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import UploadIcon from "@mui/icons-material/Upload";
import Link from "next/link";

type UploadBtnProps = {
	uraianId: number;
};

const UploadBtn = (props: UploadBtnProps) => {
	const { uraianId } = props;

	const handleClick = () => {};

	return (
		<Tooltip title="Upload Laporan" placement="top" followCursor>
			<IconButton
				LinkComponent={Link}
				color="warning"
				size="small"
				href={`/trans/kpi/file/upload/${uraianId}`}
			>
				<UploadIcon />
			</IconButton>
		</Tooltip>
	);
};

export default UploadBtn;
