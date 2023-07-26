import CellBuilder from "@components/commons/table/cell.builder";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import { UraianFile } from "@myTypes/entity/uraian.file";
import ViewBtn from "./button/view";
import UploadBtn from "./button/upload";

type TransKpiFileComponentProps = {
	fileList: UraianFile[];
	uraianId: number;
};
const TransKpiFileComponent = (props: TransKpiFileComponentProps) => {
	const { fileList, uraianId } = props;
	return fileList.length > 0 ? (
		<>
			<CellBuilder value="Sudah Upload" chip />
			<TableCell>
				<Stack direction="row" spacing={1}>
					<ViewBtn fileList={fileList} uraianId={uraianId} />
					<UploadBtn uraianId={uraianId} />
				</Stack>
			</TableCell>
		</>
	) : (
		<>
			<CellBuilder value="Tidak ada file" chip chipColor="error" />
			<TableCell>
				<Stack direction="row" spacing={1}>
					<UploadBtn uraianId={uraianId} />
				</Stack>
			</TableCell>
		</>
	);
};

export default TransKpiFileComponent;
