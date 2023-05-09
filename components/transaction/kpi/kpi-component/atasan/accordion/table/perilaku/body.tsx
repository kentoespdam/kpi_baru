import EditBtn from "@commons/components/button/edit.button";
import CellBuilder from "@commons/components/table/cell.builder";
import { ITransPerilaku } from "@interfaces/ITransPerilaku";
import { ITransPerilakuNilai } from "@interfaces/ITransPerilakuNilai";
import Stack from "@mui/material/Stack";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useFormDialogStore } from "@storage/form.dialog.store";
import { useTransPerilakuStore } from "@storage/transaction/atasan/trans.perilaku.store";
import { shallow } from "zustand/shallow";

type PerilakuCellProps = {
	perilaku: ITransPerilakuNilai;
};
const PerilakuCell = (props: PerilakuCellProps) => {
	const { perilaku } = props;

	const toggleDialog = useFormDialogStore((state) => state.toggleDialog);
	const setPerilaku = useTransPerilakuStore(
		(state) => state.setPerilaku,
		shallow
	);
	function editHandler() {
		setPerilaku(perilaku);
		toggleDialog();
	}

	return (
		<TableRow>
			<CellBuilder value={perilaku.urut} />
			<CellBuilder value={perilaku.kompetensi} />
			<CellBuilder value={perilaku.uraian} />
			<CellBuilder value={perilaku.nilai} sx={{ bgcolor: "yellow" }} />
			<TableCell>
				<Stack
					direction="row"
					spacing={1}
					sx={{ display: "flex", justifyContent: "center" }}
				>
					<EditBtn editHandler={editHandler} />
				</Stack>
			</TableCell>
		</TableRow>
	);
};

type PerilakuStaffTableBodyProps = {
	transPerilaku: ITransPerilaku;
};
const PerilakuStaffTableBody = (props: PerilakuStaffTableBodyProps) => {
	const { transPerilaku } = props;
	const { perilakuList } = transPerilaku;

	return (
		<TableBody>
			{perilakuList.map((perilaku, index) => (
				<PerilakuCell key={index} perilaku={perilaku} />
			))}
		</TableBody>
	);
};

export default PerilakuStaffTableBody;
