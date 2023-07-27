import CellBuilder from "@components/commons/table/cell.builder";
import TableRow from "@mui/material/TableRow";
import { UraianWithFile } from "@myTypes/entity/uraian";
import TransKpiFileComponent from "./file";

type UraianCellProps = {
	uraian: UraianWithFile;
};
const UraianCell = (props: UraianCellProps) => {
	const { uraian } = props;
	const { fileList } = uraian;

	return (
		<>
			<CellBuilder value={uraian.uraian} />
			<TransKpiFileComponent fileList={fileList} uraianId={uraian.id} />
		</>
	);
};

type TransKpiUraianComponentProps = {
	uraianList: UraianWithFile[];
	first?: boolean;
};
const TransKpiUraianComponent = (props: TransKpiUraianComponentProps) => {
	const { uraianList, first } = props;

	return first ? (
		<UraianCell uraian={uraianList[0]} />
	) : (
		<>
			{uraianList.map((uraian, index) =>
				index === 0 ? null : (
					<TableRow key={uraian.id}>
						<UraianCell uraian={uraian} />
					</TableRow>
				)
			)}
		</>
	);
};

export default TransKpiUraianComponent;
