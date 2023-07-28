import CloudDoneIcon from "@mui/icons-material/CloudDone";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { UraianFile } from "@myTypes/entity/uraian.file";
import { useViewFileDialogStore } from "@store/dialog/view.file";

type ViewBtnProps = {
	indikatorId: number;
	fileList: UraianFile[];
	uraianId: number;
};
const ViewBtn = (props: ViewBtnProps) => {
	const { indikatorId, fileList, uraianId } = props;
	const { toggleViewOpen, setIdIndikator, setIdUraian } =
		useViewFileDialogStore();

	const handleClick = () => {
		setIdIndikator(indikatorId);
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
