import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { TransFile } from "@myTypes/entity/trans.file";
import { UraianFile } from "@myTypes/entity/uraian.file";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import dynamic from "next/dynamic";

const CloudDoneIcon = dynamic(() => import("@mui/icons-material/CloudDone"));

type ViewBtnProps = {
	fileList: UraianFile[] | TransFile[];
	uraianId: number;
};
const ViewBtn = (props: ViewBtnProps) => {
	const { fileList, uraianId } = props;
	const { toggleViewOpen, setIdUraian } = useViewFileDialogStore();

	const handleClick = () => {
		setIdUraian(uraianId);
		toggleViewOpen();
	};

	return (
		<Tooltip title="Lihat daftar file" placement="top" followCursor>
			<IconButton color="success" onClick={handleClick}>
				<Badge badgeContent={fileList.length} color="success">
					<CloudDoneIcon />
				</Badge>
			</IconButton>
		</Tooltip>
	);
};

export default ViewBtn;
