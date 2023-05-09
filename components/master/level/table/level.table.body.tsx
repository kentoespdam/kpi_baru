import BtnAction from "@commons/components/button/btn.action";
import CellBuilder from "@commons/components/table/cell.builder";
import { ILevelForm, ILevelWithAudit } from "@commons/interfaces/ILevel";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { handleDelete, useLevelStore } from "@storage/master/level.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { shallow } from "zustand/shallow";

type ActionButtonProps = {
	value: ILevelWithAudit;
};

const ActionButton = (props: ActionButtonProps) => {
	const { value } = props;
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { setForm, setAction, pageRequest, setPages } = useLevelStore(
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
		handleDelete(value.id, openNotif, pageRequest, setPages);
	};

	const editHandler = () => {
		const form: ILevelForm = {
			id: value.id,
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

const LevelTableBody = () => {
	const pages = useLevelStore((state) => state.pages);
	if (pages?.data === undefined) return null;
	if (pages.data.numberOfElements === 0) return null;
	let urut = pages!.data.number * pages!.data.size + 1;

	return (
		<TableBody>
			{pages?.data.content.map((level) => (
				<TableRow key={level.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={level} />
					<CellBuilder value={level.status} chip />
					<ActionButton value={level} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default LevelTableBody;
