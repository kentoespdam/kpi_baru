import CellBuilder from "@commons/components/table/cell.builder";
import { IUraianFile } from "@interfaces/IUraianFile";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import { UploadBtn, ViewBtn } from "./cell.button";

type KpiStaffFileCellProps = {
	fileList: IUraianFile[];
	uraianId: number;
};

export const KpiStaffFileCell = (props: KpiStaffFileCellProps) => {
	const { fileList, uraianId } = props;

	if (fileList.length === 0)
		return (
			<>
				<CellBuilder value="Tidak ada file" chip chipColor="error" />
				<TableCell>
					<Stack direction="row" spacing={1}>
						<UploadBtn uraianId={uraianId} />
					</Stack>
				</TableCell>
			</>
		);

	return (
		<>
			<CellBuilder value="Sudah Upload" chip />
			<TableCell>
				<Stack direction="row" spacing={1}>
					<ViewBtn fileList={fileList} uraianId={uraianId} />
					<UploadBtn uraianId={uraianId} />
				</Stack>
			</TableCell>
		</>
	);
};
