import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import { LOCAL_URAIAN_FILE, UraianFile } from "@myTypes/entity/uraian.file";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import { useViewPdfDialogStore } from "@store/dialog/view.pdf";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useSessionStore } from "@store/main/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doDelete } from "@utils/trans/file";
import Link from "next/link";
import { useSnackbar } from "notistack";

type TransKpiFileListItemCellProps = {
	uraianFile: UraianFile;
};
const TransKpiFileListItemCell = (props: TransKpiFileListItemCellProps) => {
	const { uraianFile } = props;
	const { periode, bridgeKpi: bridgeKpi } = useTransKpiStore();
	const user = useSessionStore((state) => state.user);
	const toggleViewOpen = useViewFileDialogStore(
		(state) => state.toggleViewOpen
	);
	const { toggleViewPdfOpen, setFileId } = useViewPdfDialogStore();
	const { enqueueSnackbar } = useSnackbar();
	const qc = useQueryClient();

	const mutation = useMutation({
		mutationFn: doDelete,
		onError: (error) => {
			enqueueSnackbar(`${error}`, { variant: "error" });
		},
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [
					"trans.kpi.staff",
					{
						nipam: user!.userId,
						kpiId: bridgeKpi!.id,
						periode: periode!.periode,
					},
				],
			});
			enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
		},
	});
	const showPdf = () => {
		setFileId(uraianFile.id);
		toggleViewOpen();
		toggleViewPdfOpen();
	};

	const handleDelete = () => {
		const x = confirm("Apakah anda yakin ingin menghapus file ini?");
		if (!x) return;
		mutation.mutate(uraianFile.id);
	};

	switch (uraianFile.fileType) {
		case "pdf":
			return (
				<TableCell>
					{uraianFile.nipam === user!.userId ? (
						<Tooltip title="Delete File">
							<IconButton color="error" onClick={handleDelete}>
								<DeleteForeverIcon />
							</IconButton>
						</Tooltip>
					) : null}
					<Tooltip title="View File">
						<Button
							onClick={showPdf}
							size="small"
							color="warning"
							startIcon={<VisibilityIcon />}
						>
							{uraianFile.fileName}
						</Button>
					</Tooltip>
				</TableCell>
			);
		default:
			return (
				<TableCell>
					<Tooltip title="Delete File">
						<IconButton color="error" onClick={handleDelete}>
							<DeleteForeverIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Download File">
						<Button
							LinkComponent={Link}
							href={`${LOCAL_URAIAN_FILE}/download/${uraianFile.id}`}
							color="info"
							size="small"
							startIcon={<FileDownloadIcon />}
						>
							{uraianFile.fileName}
						</Button>
					</Tooltip>
				</TableCell>
			);
	}
};

export default TransKpiFileListItemCell;
