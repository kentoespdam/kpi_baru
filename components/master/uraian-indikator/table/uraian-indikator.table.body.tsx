import BtnAction from "@commons/components/button/btn.action";
import CellBuilder from "@commons/components/table/cell.builder";
import { ActionButtonProps } from "@interfaces/ICommons";
import {
	IUraianIndikatorWithAudit,
	LOCAL_URAIAN_INDIKATOR,
} from "@interfaces/IUraianIndikator";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useFormDialogStore } from "@storage/form.dialog.store";
import {
	handleDelete,
	useUraianIndikatorStore,
} from "@storage/master/uraian.indikator.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { shallow } from "zustand/shallow";

const ActionButtons = (props: ActionButtonProps<IUraianIndikatorWithAudit>) => {
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { setForm, setAction, pageRequest, setPages } =
		useUraianIndikatorStore(
			(state) => ({
				setForm: state.setForm,
				setAction: state.setAction,
				pageRequest: state.pageRequest,
				setPages: state.setPages,
			}),
			shallow
		);
	const openNotif = useNotifSnackbarStore((state) => state.openNotif);

	const deleteHandler = () => {
		const c = confirm("Are you sure to delete this record?");
		if (!c) return;
		const url = `${LOCAL_URAIAN_INDIKATOR}/${props.value.id}`;
		handleDelete({
			url,
			openNotif,
			pageRequest,
			setPages,
		});
	};

	const editHandler = () => {
		const form = {
			...props.value,
			kpi: props.value.indikator.kpi,
		};
		setForm(form);
		setAction("update");
		toggleDialog();
	};

	return (
		<TableCell align="center">
			<BtnAction
				deleteHandler={deleteHandler}
				editHandler={editHandler}
			/>
		</TableCell>
	);
};

const UraianIndikatorTableBody = () => {
	const pages = useUraianIndikatorStore((state) => state.pages);
	if (pages?.data === undefined)
		return (
			<TableBody>
				<TableRow>
					<TableCell colSpan={10} align="center">
						No Content
					</TableCell>
				</TableRow>
			</TableBody>
		);
	if (pages.data.numberOfElements === 0) return null;
	let urut = pages.data.number * pages.data.size + 1;

	return (
		<TableBody>
			{pages.data.content.map((row) => (
				<TableRow key={row.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={row.indikator.kpi!.name} />
					<CellBuilder value={row.indikator.indikator} />
					<CellBuilder value={row.uraian} />
					<CellBuilder value={row.volume} />
					<CellBuilder value={row.satuan} />
					<CellBuilder value={row.waktu} />
					<CellBuilder value={row.bobot} percent />
					<CellBuilder value={row.status} chip />
					<ActionButtons value={row} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default UraianIndikatorTableBody;
