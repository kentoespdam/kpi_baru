import CellBuilder from "@components/commons/table/cell.builder";
import { indikatorPerilaku } from "@helper/nilaiIndikator";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import {
	TransPerilakuQKeyProps,
	TransPerilaku,
} from "@myTypes/entity/trans.perilaku";
import { TransPerilakuNilai } from "@myTypes/entity/trans.perilaku.nilai";
import { useViewFormPerilakuDialogStore } from "@store/dialog/view.form.perilaku";
import { useQueryClient } from "@tanstack/react-query";
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

type TransPerilakuTableBodyProps = {
	queryKey: (string | TransPerilakuQKeyProps)[];
};
const TransPerilakuTableBody = (props: TransPerilakuTableBodyProps) => {
	const obj = props.queryKey[1] as TransPerilakuQKeyProps;
	const nipamStaff = obj.nipam;
	const levelStaff = obj.levelId;

	const qc = useQueryClient();
	const data = qc.getQueryData<TransPerilaku>(props.queryKey);

	let urut = 1;

	return data ? (
		<TableBody>
			{data.perilakuList.map((row) => (
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
						nipam={nipamStaff}
						levelId={levelStaff ?? null}
					/>
				</TableRow>
			))}
		</TableBody>
	) : null;
};

export default TransPerilakuTableBody;
