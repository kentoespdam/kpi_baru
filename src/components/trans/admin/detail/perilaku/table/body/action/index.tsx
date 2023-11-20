import CellBuilder from "@components/commons/table/cell.builder";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { TransPerilakuNilai } from "@myTypes/entity/trans.perilaku.nilai";
import { useViewFormPerilakuDialogStore } from "@store/dialog/view.form.perilaku";
import EditIcon from "@mui/icons-material/Edit";
import { ACCEPTED_STATUS, AcceptedStatus } from "@myTypes/index";

type PerilakuActionProps = {
	perilaku: TransPerilakuNilai;
	nipam: string | null;
	levelId: number | null;
	lockStatus?: AcceptedStatus;
};
const PerilakuAction = (props: PerilakuActionProps) => {
	const { perilaku, nipam, levelId, lockStatus } = props;
	const { toggleFormPerilakuOpen, setNipam, setLevelId } =
		useViewFormPerilakuDialogStore();

	const editHandler = () => {
		setNipam(nipam);
		setLevelId(levelId);
		toggleFormPerilakuOpen(perilaku);
	};

	return (
		<CellBuilder bordered>
			{lockStatus === ACCEPTED_STATUS.UNLOCKED ? (
				<Tooltip title="Edit Nilai Perilaku Staff" followCursor>
					<IconButton onClick={editHandler} color="warning">
						<EditIcon />
					</IconButton>
				</Tooltip>
			) : null}
		</CellBuilder>
	);
};

export default PerilakuAction;
