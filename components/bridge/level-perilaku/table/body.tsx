import BtnAction from "@commons/components/button/btn.action";
import  CellBuilder  from "@commons/components/table/cell.builder";
import {
	IBridgeLevelPerilakuWithAudit,
	LOCAL_BRIDGE_LEVEL_PERILAKU,
} from "@interfaces/IBridgeLevelPerilaku";
import { ActionButtonProps } from "@interfaces/ICommons";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
	handleDelete,
	useBridgeLevelPerilakuStore,
} from "@storage/bridge/level-perilaku.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { shallow } from "zustand/shallow";

const ActionButtons = (
	props: ActionButtonProps<IBridgeLevelPerilakuWithAudit>
) => {
	const toggleDialog = useFormDialogStore(
		(state) => state.toggleDialog,
		shallow
	);
	const { setForm, setAction, pageRequest, setPageRequest, setPages } =
		useBridgeLevelPerilakuStore(
			(state) => ({
				setForm: state.setForm,
				setAction: state.setAction,
				pageRequest: state.pageRequest,
				setPageRequest: state.setPageRequest,
				setPages: state.setPages,
			}),
			shallow
		);
	const openNotif = useNotifSnackbarStore(
		(state) => state.openNotif,
		shallow
	);

	const deleteHandler = () => {
		const c = confirm("Are you sure to delete this record?");
		if (!c) return;
		const url = `${LOCAL_BRIDGE_LEVEL_PERILAKU}/${props.value.id}`;
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
			perilaku: props.value.perilaku,
			level: props.value.level,
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

const BridgeLevelPerilakuTableBody = () => {
	const pages = useBridgeLevelPerilakuStore((state) => state.pages, shallow);
	if (pages?.data === undefined) return null;
	if (pages.data.numberOfElements === 0) return null;
	let urut = pages.data.number * pages.data.size + 1;

	return (
		<TableBody>
			{pages.data.content.map((row) => (
				<TableRow key={row.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={row.level!.level} />
					<CellBuilder value={row.perilaku.kompetensi} />
					<CellBuilder value={row.status} chip />
					<ActionButtons value={row} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default BridgeLevelPerilakuTableBody;
