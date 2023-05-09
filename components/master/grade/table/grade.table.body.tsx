import BtnAction from "@commons/components/button/btn.action";
import CellBuilder from "@commons/components/table/cell.builder";
import { IGradeWithAudit, LOCAL_GRADE } from "@commons/interfaces/IGrade";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { handleDelete, useGradeStore } from "@storage/master/grade.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { shallow } from "zustand/shallow";

type ActionButtonProps = {
	value: IGradeWithAudit;
};

const ActionButton = (props: ActionButtonProps) => {
	const { value } = props;
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { setForm, setAction, pageRequest, setPages } = useGradeStore(
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
		const url = `${LOCAL_GRADE}/${value.id}`;
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
			grade: value.grade,
			level: value.level,
			tukin: value.tukin,
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

const GradeTableBody = () => {
	const pages = useGradeStore((state) => state.pages, shallow);
	if (pages === undefined) return null;
	if (pages.data.numberOfElements === 0) return null;
	let urut = pages.data.number * pages.data.size + 1;

	return (
		<TableBody>
			{pages.data.content.map((value) => (
				<TableRow key={value.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={`GRADE ${value.grade}`} />
					<CellBuilder value={value.level.level} />
					<CellBuilder value={value.tukin} currency />
					<CellBuilder value={value.status} chip />
					<ActionButton value={value} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default GradeTableBody;
