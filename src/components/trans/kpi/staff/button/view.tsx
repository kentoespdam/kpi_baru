import CloudDoneIcon from "@mui/icons-material/CloudDone";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { UraianFile } from "@myTypes/entity/uraian.file";
import Link from "next/link";

type ViewBtnProps = {
	indikatorId: number;
	fileList: UraianFile[];
	uraianId: number;
};
const ViewBtn = (props: ViewBtnProps) => {
	const { indikatorId, fileList, uraianId } = props;

	return (
		<Tooltip title="Lihat daftar file" placement="top" followCursor>
			<IconButton
				LinkComponent={Link}
				color="success"
				href={`/trans/kpi/file/${indikatorId}/${uraianId}`}
				// onClick={() => toggleDialog(idKpi)}
			>
				<Badge badgeContent={fileList.length} color="success">
					<CloudDoneIcon />
				</Badge>
			</IconButton>
		</Tooltip>
	);
};

export default ViewBtn;
