import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { LOCAL_URAIAN_FILE, UraianFile } from "@myTypes/entity/uraian.file";
import Link from "next/link";

type TransKpiFileListItemCellProps = {
	uraianFile: UraianFile;
};
const TransKpiFileListItemCell = (props: TransKpiFileListItemCellProps) => {
	const { uraianFile } = props;

	const showPdf = () => {};

	switch (uraianFile.fileType) {
		case "pdf":
			return (
				<Button
					onClick={showPdf}
					size="small"
					color="warning"
					startIcon={<VisibilityIcon />}
				>
					{uraianFile.fileName}
				</Button>
			);
		default:
			return (
				<Button
					LinkComponent={Link}
					href={`${LOCAL_URAIAN_FILE}/${uraianFile.id}`}
					color="info"
					size="small"
					startIcon={<FileDownloadIcon />}
				>
					{uraianFile.fileName}
				</Button>
			);
	}
};

export default TransKpiFileListItemCell;
