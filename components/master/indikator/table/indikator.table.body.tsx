import BtnAction from "@commons/components/button/btn.action";
import  CellBuilder  from "@commons/components/table/cell.builder";
import { ActionButtonProps } from "@interfaces/ICommons";
import { IIndikatorWithAudit, LOCAL_INDIKATOR } from "@interfaces/IIndikator";
import { TableCell } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { useFormDialogStore } from "@storage/form.dialog.store";
import {
	handleDelete,
	useIndikatorStore,
} from "@storage/master/indikator.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { shallow } from "zustand/shallow";

const ActionButtons = (props: ActionButtonProps<IIndikatorWithAudit>) => {
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { setForm, setAction, pageRequest, setPages } = useIndikatorStore(
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
		const url = `${LOCAL_INDIKATOR}/${props.value.id}`;
		handleDelete({
			url,
			openNotif,
			pageRequest,
			setPages,
		});
	};

	const editHandler = () => {
		const form = {
			id: props.value.id,
			kpi: props.value.kpi,
			indikator: props.value.indikator,
			urut: props.value.urut,
			status: props.value.status,
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

const IndikatorTableBody = () => {
	const pages = useIndikatorStore((state) => state.pages);
	if (pages?.data === undefined) return null;
	if (pages.data.numberOfElements === 0) return null;
	let urut = pages.data.number * pages.data.size + 1;

	return (
		<TableBody>
			{pages.data.content.map((row) => (
				<TableRow key={row.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={row.kpi!.name} />
					<CellBuilder value={row.indikator} />
					<CellBuilder value={row.urut} />
					<CellBuilder value={row.status} chip />
					<ActionButtons value={row} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default IndikatorTableBody;
