import { IUraianFile } from "@interfaces/IUraianFile";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import UploadIcon from "@mui/icons-material/Upload";
import { useUploadDialogStore } from "@storage/transaction/upload.dialog.store";
import { shallow } from "zustand/shallow";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import Badge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";

type UploadBtnProps = {
	uraianId: number;
};
export const UploadBtn = (props: UploadBtnProps) => {
	const { uraianId } = props;
	const toggleUpload = useUploadDialogStore(
		(state) => state.toggleUpload,
		shallow
	);

	function handleClick() {
		console.log("clicked");
		toggleUpload("Upload File Laporan", true, uraianId);
	}

	return (
		<Tooltip title="Upload Laporan" placement="top" followCursor>
			<IconButton color="warning" size="small" onClick={handleClick}>
				<UploadIcon />
			</IconButton>
		</Tooltip>
	);
};

type ViewBtnProps = {
	fileList: IUraianFile[];
	uraianId: number;
};
export const ViewBtn = (props: ViewBtnProps) => {
	const { fileList, uraianId } = props;
	const { toggleUpload, setFileList } = useUploadDialogStore(
		(state) => ({
			toggleUpload: state.toggleUpload,
			setFileList: state.setFileList,
		}),
		shallow
	);

	function handleClick() {
		setFileList(fileList);
		toggleUpload("View List File Laporan", false, uraianId);
	}
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

type EditBtnProps = {
	onClick: () => void;
};
export const EditBtn = (props: EditBtnProps) => {
	const { onClick } = props;
	return (
		<Tooltip title="Edit Data Penilaian" placement="top" followCursor>
			<IconButton size="small" color="primary" onClick={onClick}>
				<EditIcon />
			</IconButton>
		</Tooltip>
	);
};
