import BtnAction from "@commons/components/button/btn.action";
import CellBuilder from "@commons/components/table/cell.builder";
import { IProfesiWithAudit, LOCAL_PROFESI } from "@commons/interfaces/IProfesi";
import { TableCell } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { handleDelete, useProfesiStore } from "@storage/master/profesi.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { shallow } from "zustand/shallow";

type ActionButtonProps = {
	value: IProfesiWithAudit;
};

const ActionButtons = (props: ActionButtonProps) => {
	const { value } = props;
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { setForm, setAction, pageRequest, setPages } = useProfesiStore(
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
		const url = `${LOCAL_PROFESI}/${value.id}`;
		handleDelete({
			url,
			openNotif,
			pageRequest,
			setPages,
		});
	};

	const editHandler = () => {
		const form = {
			id: value.id,
			name: value.name,
			level: value.level,
			status: value.status,
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

const ProfesiTableBody = () => {
	const pages = useProfesiStore((state) => state.pages, shallow);
	if (pages?.data === undefined) return null;
	if (pages.data.numberOfElements === 0) return null;
	let urut = pages.data.number * pages.data.size + 1;

	return (
		<TableBody>
			{pages.data.content.map((value) => (
				<TableRow key={value.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={value.name} />
					<CellBuilder value={value.level.level} />
					<CellBuilder value={value.status} chip />
					<ActionButtons value={value} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default ProfesiTableBody;
