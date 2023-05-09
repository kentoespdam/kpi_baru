import BtnAction from "@commons/components/button/btn.action";
import  CellBuilder  from "@commons/components/table/cell.builder";
import {
	IBridgeKpiPegawaiWithAudit,
	LOCAL_BRIDGE_KPI_PEGAWAI,
} from "@interfaces/IBridgeKpiPegawai";
import { ActionButtonProps } from "@interfaces/ICommons";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
	useBridgeKpiPegawaiStore,
	handleDelete,
} from "@storage/bridge/kpi-pegawai.store";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useNotifSnackbarStore } from "@storage/notif.snackbar.store";
import { shallow } from "zustand/shallow";

const ActionButtons = (
	props: ActionButtonProps<IBridgeKpiPegawaiWithAudit>
) => {
	const toggleDialog = useFormDialogStore(
		(state) => state.toggleDialog,
		shallow
	);
	const { setForm, setAction, pageRequest, setPages } =
		useBridgeKpiPegawaiStore(
			(state) => ({
				setForm: state.setForm,
				setAction: state.setAction,
				pageRequest: state.pageRequest,
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
		const url = `${LOCAL_BRIDGE_KPI_PEGAWAI}/${props.value.id}`;
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
			employee: props.value.employee,
			level: props.value.level,
			kpi: props.value.kpi,
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
const BridgeKpiPegawaiTableBody = () => {
	const pages = useBridgeKpiPegawaiStore((state) => state.pages, shallow);
	if (pages?.data === undefined) return null;
	if (pages.data.numberOfElements === 0) return null;
	let urut = pages.data.number * pages.data.size + 1;

	return (
		<TableBody>
			{pages.data.content.map((row) => (
				<TableRow key={row.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={row.nipam} />
					<CellBuilder value={row.employee!.nama} />
					<CellBuilder value={row.kpi.name} />
					<CellBuilder value={row.employee!.organization.name} />
					<CellBuilder value={row.employee!.position.name} />
					<CellBuilder value={row.status} chip />
					<ActionButtons value={row} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default BridgeKpiPegawaiTableBody;
