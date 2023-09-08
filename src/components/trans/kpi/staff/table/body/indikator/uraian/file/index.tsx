import CellBuilder from "@components/commons/table/cell.builder";
import UploadBtn from "@components/trans/kpi/staff/button/upload";
import ViewBtn from "@components/trans/kpi/staff/button/view";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import { UraianFile } from "@myTypes/entity/uraian.file";

type TransKpiFileComponentProps = {
	indikatorId: number;
	fileList: UraianFile[];
	uraianId: number;
};

const TransKpiFileComponent = (props: TransKpiFileComponentProps) => {
	const { fileList, uraianId } = props;

	return fileList.length > 0 ? (
		<>
			<CellBuilder bordered value="Sudah Upload" chip />
			<TableCell>
				<Stack direction="row" spacing={1}>
					<ViewBtn fileList={fileList} uraianId={uraianId} />
					<UploadBtn uraianId={uraianId} />
				</Stack>
			</TableCell>
		</>
	) : (
		<>
			<CellBuilder
				bordered
				value="Tidak ada file"
				chip
				chipColor="error"
			/>
			<TableCell>
				<Stack direction="row" spacing={1}>
					<UploadBtn uraianId={uraianId} />
				</Stack>
			</TableCell>
		</>
	);
};

export default TransKpiFileComponent;
