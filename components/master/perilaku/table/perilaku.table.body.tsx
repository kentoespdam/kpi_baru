import BtnAction from "@commons/components/button/btn.action";
import CellBuilder from "@commons/components/table/cell.builder";
import { ActionButtonProps } from "@interfaces/ICommons";
import { IPerilakuWithAudit, LOCAL_PERILAKU } from "@interfaces/IPerilaku";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { handleDelete, usePerilakuStore } from "@storage/master/perilaku.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { shallow } from "zustand/shallow";

const ActionButtons = (props: ActionButtonProps<IPerilakuWithAudit>) => {
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { setForm, setAction, pageRequest, setPages } = usePerilakuStore(
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
		const url = `${LOCAL_PERILAKU}/${props.value.id}`;
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

const PerilakuTableBody = () => {
	const pages = usePerilakuStore((state) => state.pages);
	if (pages?.data === undefined) return null;
	if (pages.data.numberOfElements === 0) return null;
	let no = pages.data.number * pages.data.size + 1;

	return (
		<TableBody>
			{pages.data.content.map((row) => (
				<TableRow key={row.id}>
					<CellBuilder value={no++} />
					<CellBuilder value={row.kompetensi} />
					<CellBuilder
						value={row.uraian}
						style={{
							maxWidth: 300,
							whiteSpace: "normal",
							wordWrap: "break-word",
						}}
					/>
					<CellBuilder value={row.urut} />
					<CellBuilder value={row.status} chip />
					<ActionButtons value={row} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default PerilakuTableBody;
