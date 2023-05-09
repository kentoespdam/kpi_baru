import BtnAction from "@commons/components/button/btn.action";
import  CellBuilder  from "@commons/components/table/cell.builder";
import { ActionButtonProps } from "@interfaces/ICommons";
import { IKpiWithAudit, LOCAL_KPI } from "@interfaces/IKpi";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { handleDelete, useKpiStore } from "@storage/master/kpi.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { shallow } from "zustand/shallow";

const ActionButtons = (props: ActionButtonProps<IKpiWithAudit>) => {
	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const { setForm, setAction, pageRequest, setPages } = useKpiStore(
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
		const url = `${LOCAL_KPI}/${props.value.id}`;
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
			organization: props.value.organization,
			position: props.value.position,
			profesi: props.value.profesi,
			name: props.value.name,
			grade: props.value.grade,
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

const KpiTableBody = () => {
	const pages = useKpiStore((state) => state.pages);
	if (pages?.data === undefined) return null;
	if (pages.data.numberOfElements === 0) return null;
	let urut = pages.data.number * pages.data.size + 1;

	return (
		<TableBody>
			{pages.data.content.map((value) => (
				<TableRow key={value.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={value.name} />
					<CellBuilder value={value.organization} />
					<CellBuilder value={value.position} />
					<CellBuilder value={value.profesi} />
					<CellBuilder value={value.grade} />
					<CellBuilder value={value.status} chip />
					<ActionButtons value={value} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default KpiTableBody;
