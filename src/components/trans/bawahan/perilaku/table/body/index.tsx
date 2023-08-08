import CellBuilder from "@components/commons/table/cell.builder";
import { indikatorPerilaku } from "@helper/nilaiIndikator";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { TransPerilaku } from "@myTypes/entity/trans.perilaku";
import { TransPerilakuNilai } from "@myTypes/entity/trans.perilaku.nilai";
import { useViewFormPerilakuDialogStore } from "@store/dialog/view.form.perilaku";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useTransPerilakuStore } from "@store/filter/trans/perilaku";
import { useQueryClient } from "@tanstack/react-query";

type PerilakuActionProps = {
	perilaku: TransPerilakuNilai;
};
const PerilakuAction = (props: PerilakuActionProps) => {
	const { perilaku } = props;
	const { toggleFormPerilakuOpen } = useViewFormPerilakuDialogStore();

	const editHandler = () => toggleFormPerilakuOpen(perilaku);

	return (
		<CellBuilder bordered>
			<Tooltip title="Edit Nilai Perilaku Staff" followCursor>
				<IconButton onClick={editHandler} color="warning">
					<EditIcon />
				</IconButton>
			</Tooltip>
		</CellBuilder>
	);
};

const TransPerilakuTableBody = () => {
	const periode = useTransKpiStore((state) => state.periode);
	const nipamStaff = useTransKinerjaStore((state) => state.nipamStaff);
	const levelStaff = useTransPerilakuStore((state) => state.levelStaff);

	const qc = useQueryClient();
	const data = qc.getQueryData<TransPerilaku>([
		"trans.perilaku.bawahan",
		{
			nipam: nipamStaff,
			periode: periode?.periode,
			levelId: levelStaff,
		},
	]);

	let urut = 1;

	return data ? (
		<TableBody>
			{data.perilakuList.map((row) => (
				<TableRow key={row.id}>
					<CellBuilder value={urut++} bordered />
					<CellBuilder value={row.kompetensi} width={200} bordered />
					<CellBuilder value={row.uraian} width={400} bordered />
					<CellBuilder
						value={indikatorPerilaku(row.nilai)}
						noWrap
						align="center"
						bordered
					/>
					<CellBuilder value={row.nilai} bordered />
					<PerilakuAction perilaku={row} />
				</TableRow>
			))}
		</TableBody>
	) : null;
};

export default TransPerilakuTableBody;
