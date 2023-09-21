import CellBuilder from "@components/commons/table/cell.builder";
import { indikatorPerilaku } from "@helper/nilaiIndikator";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { TransPerilaku } from "@myTypes/entity/trans.perilaku";
import { TransPerilakuNilai } from "@myTypes/entity/trans.perilaku.nilai";
import { useViewFormPerilakuDialogStore } from "@store/dialog/view.form.perilaku";
import dynamic from "next/dynamic";
const EditIcon = dynamic(() => import("@mui/icons-material/Edit"));

type PerilakuActionProps = {
	perilaku: TransPerilakuNilai;
	nipam: string | null;
	levelId: number | null;
};
const PerilakuAction = (props: PerilakuActionProps) => {
	const { perilaku, nipam, levelId } = props;
	const { toggleFormPerilakuOpen, setNipam, setLevelId } =
		useViewFormPerilakuDialogStore();

	const editHandler = () => {
		setNipam(nipam);
		setLevelId(levelId);
		toggleFormPerilakuOpen(perilaku);
	};

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

type KpiAdminPerilakuTableBodyProps = {
	nipam: string | null;
	levelId: number | null;
	data?: TransPerilaku;
};
const KpiAdminPerilakuTableBody = (props: KpiAdminPerilakuTableBodyProps) => {
	const { nipam, levelId, data } = props;
	if (!data) return null;
	let urut = 1;
	return (
		<TableBody>
			{data?.perilakuList.map((row) => (
				<TableRow hover key={row.id}>
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
					<PerilakuAction
						perilaku={row}
						nipam={nipam}
						levelId={levelId}
					/>
				</TableRow>
			))}
		</TableBody>
	);
};

export default KpiAdminPerilakuTableBody;
