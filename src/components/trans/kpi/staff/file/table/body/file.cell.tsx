import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { LOCAL_URAIAN_FILE, UraianFile } from "@myTypes/entity/uraian.file";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import { useViewPdfDialogStore } from "@store/dialog/view.pdf";
import Link from "next/link";
import { useRouter } from "next/navigation";

type TransKpiFileListItemCellProps = {
	uraianFile: UraianFile;
};
const TransKpiFileListItemCell = (props: TransKpiFileListItemCellProps) => {
	const { uraianFile } = props;
	const toggleViewOpen = useViewFileDialogStore(
		(state) => state.toggleViewOpen
	);
	const { toggleViewPdfOpen, setFileId } = useViewPdfDialogStore();
	const router = useRouter();

	const showPdf = () => {
		setFileId(uraianFile.id);
		toggleViewOpen();
		toggleViewPdfOpen();
	};

	const handleDownload = () => {};

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
					href={`${LOCAL_URAIAN_FILE}/download/${uraianFile.id}`}
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
