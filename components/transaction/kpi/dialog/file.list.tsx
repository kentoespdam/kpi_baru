import StripedTableStyle from "@commons/theme/striped.table.style";
import DialogContent from "@mui/material/DialogContent";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { useUploadDialogStore } from "@storage/transaction/upload.dialog.store";
import { shallow } from "zustand/shallow";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import { IUraianFile, LOCAL_URAIAN_FILE } from "@interfaces/IUraianFile";
import { useViewFileStore } from "@storage/transaction/view.file.store";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useAsync, { deleteHelper, getHelper } from "@helpers/useAsync";
import { Suspense } from "react";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { ESeverity } from "@interfaces/EStatus";
import TableLoading from "@commons/components/table/table.loading";
import { useTransactionKpiStore } from "@storage/transaction/kpi.store";

const UraianFileHead = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell>No</TableCell>
				<TableCell>Filename</TableCell>
			</TableRow>
		</TableHead>
	);
};

const UraianFileBody = () => {
	const { toggleUpload, transKpiUraianId } = useUploadDialogStore(
		(state) => ({
			toggleUpload: state.toggleUpload,
			transKpiUraianId: state.transKpiUraianId,
		}),
		shallow
	);
	const toggleView = useViewFileStore((state) => state.toggleView, shallow);
	const openNotif = useNotifSnackbarStore((state) => state.openNotif);
	const { periode, setPeriode } = useTransactionKpiStore(
		(state) => ({
			periode: state.periode,
			setPeriode: state.setPeriode,
		}),
		shallow
	);

	const { status, value, error } = useAsync(async () => {
		const url = `${LOCAL_URAIAN_FILE}/uraian/${transKpiUraianId}`;
		try {
			const response = await getHelper(url);
			return response.data;
		} catch (e: any) {
			console.log({ e });
			return [];
		}
	}, [transKpiUraianId]);

	function handleClick(file: IUraianFile) {
		if (file.fileType === "pdf") {
			toggleView(`${LOCAL_URAIAN_FILE}/${file.id}`);
		}

		toggleUpload();
		return;
	}

	async function deleteHandler(id: number) {
		const c = confirm("Are you sure to delete this record?");
		if (!c) return;
		try {
			const hapus = await deleteHelper(`${LOCAL_URAIAN_FILE}/${id}`);
			if (hapus.code === 202) openNotif(hapus.message, ESeverity.SUCCESS);
			else openNotif(`${hapus.status} ${hapus.message}`, ESeverity.ERROR);
			toggleUpload();
			setPeriode();
			setTimeout(() => {
				setPeriode(periode);
			}, 100);
		} catch (e: any) {
			console.log({ e });
			if (e.message != undefined) openNotif(e.message, ESeverity.ERROR);
			else openNotif(e.errors, ESeverity.ERROR);
		}
	}

	if (status === "idle") return null;
	if (status === "pending") return <TableLoading colSpan={2} />;
	if (status === "error")
		return <TableLoading colSpan={2} message={JSON.stringify(error)} />;

	const files = value as IUraianFile[];

	return (
		<TableBody>
			{/* {files === undefined && null} */}
			{files.map((file, index) => (
				<TableRow key={index}>
					<TableCell>{index + 1}</TableCell>
					<TableCell>
						<Tooltip title="View" placement="top" followCursor>
							{file.fileType === "pdf" ? (
								<Button
									color="inherit"
									startIcon={<PictureAsPdfIcon />}
									onClick={() => handleClick(file)}
								>
									{file.fileName}
								</Button>
							) : (
								<Link
									href={`${LOCAL_URAIAN_FILE}/${file.id}`}
									target="_blank"
									style={{
										color: "inherit",
										textDecoration: "none",
									}}
								>
									<Button
										color="inherit"
										startIcon={<DescriptionIcon />}
									>
										{file.fileName}
									</Button>
								</Link>
							)}
						</Tooltip>
						<Tooltip title="Delete" followCursor>
							<IconButton
								color="error"
								size="small"
								onClick={() => deleteHandler(file.id)}
							>
								<HighlightOffIcon />
							</IconButton>
						</Tooltip>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

const UraianFileListComponent = () => {
	const transKpiUraiaId = useUploadDialogStore(
		(state) => state.transKpiUraianId,
		shallow
	);
	if (transKpiUraiaId === undefined) return null;
	return (
		<DialogContent>
			<TableContainer>
				<StripedTableStyle>
					<UraianFileHead />
					<Suspense>
						<UraianFileBody />
					</Suspense>
				</StripedTableStyle>
			</TableContainer>
		</DialogContent>
	);
};

export default UraianFileListComponent;
