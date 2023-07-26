import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { UraianFile } from "@myTypes/entity/uraian.file";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

type ViewBtnProps = {
	fileList: UraianFile[];
	uraianId: number;
};
const ViewBtn = (props: ViewBtnProps) => {
	const { fileList, uraianId } = props;
	const handleClick = () => {};

	return (
		<Tooltip title="Lihat daftar file" placement="top" followCursor>
			<IconButton
				color="success"
				onClick={handleClick}
				// onClick={() => toggleDialog(idKpi)}
			>
				<Badge badgeContent={fileList.length} color="success">
					<CloudDoneIcon />
				</Badge>
			</IconButton>
		</Tooltip>
	);
};

export default ViewBtn;
