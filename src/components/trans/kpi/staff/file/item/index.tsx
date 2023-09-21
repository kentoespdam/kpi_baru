import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { TransKpiQKeyProps } from "@myTypes/entity/trans.kpi";
import { LOCAL_URAIAN_FILE, UraianFile } from "@myTypes/entity/uraian.file";
import { useViewFileDialogStore } from "@store/dialog/view.file";
import { useViewPdfDialogStore } from "@store/dialog/view.pdf";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doDelete } from "@utils/trans/file";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSnackbar } from "notistack";

const DeleteForeverIcon = dynamic(
	() => import("@mui/icons-material/DeleteForever")
);
const FileDownloadIcon = dynamic(
	() => import("@mui/icons-material/FileDownload")
);
const VisibilityIcon = dynamic(() => import("@mui/icons-material/Visibility"));

type TransKpiFileListItemCellProps = {
	uraianId: number;
	uraianFile: UraianFile;
	qKeyKpiStaff: (string | TransKpiQKeyProps)[];
};
const TransFileListItem = (props: TransKpiFileListItemCellProps) => {
	const { uraianId, uraianFile } = props;
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
			qc.invalidateQueries(props.qKeyKpiStaff);
			qc.invalidateQueries({
				queryKey: ["trans.file.list", Number(uraianId)],
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
				<>
					<ListItemButton>
						<Tooltip title="Lihat File">
							<ListItemIcon sx={{ mr: 2 }} onClick={showPdf}>
								<VisibilityIcon color="info" />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary={uraianFile.fileName} />
						<Tooltip title="Hapus File">
							<ListItemIcon sx={{ mr: 2 }} onClick={handleDelete}>
								<DeleteForeverIcon color="error" />
							</ListItemIcon>
						</Tooltip>
					</ListItemButton>
					<Divider />
				</>
			);
		default:
			return (
				<>
					<ListItemButton>
						<Link
							href={`${LOCAL_URAIAN_FILE}/download/${uraianFile.id}`}
							target="_blank"
						>
							<Tooltip title="Unduh File">
								<ListItemIcon sx={{ mr: 2 }}>
									<FileDownloadIcon color="info" />
								</ListItemIcon>
							</Tooltip>
						</Link>
						<ListItemText primary={uraianFile.fileName} />
						<Tooltip title="Hapus File">
							<ListItemIcon sx={{ mr: 2 }} onClick={handleDelete}>
								<DeleteForeverIcon color="error" />
							</ListItemIcon>
						</Tooltip>
					</ListItemButton>
					<Divider />
				</>
			);
	}
};

export default TransFileListItem;
