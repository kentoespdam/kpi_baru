import CellBuilder from "@components/commons/table/cell.builder";
import TableRow from "@mui/material/TableRow";
import { TransUraian } from "@myTypes/entity/trans.uraian";
import TransKpiFileComponent from "./file";

type UraianCellProps = {
	indikatorId: number;
	uraian: TransUraian;
};
const UraianCell = (props: UraianCellProps) => {
	const { indikatorId, uraian } = props;
	const { fileList } = uraian;

	return (
		<>
			<CellBuilder bordered value={uraian.uraian} />
			<TransKpiFileComponent
				fileList={fileList}
				uraianId={uraian.id}
				indikatorId={indikatorId}
			/>
		</>
	);
};

type TransKpiUraianComponentProps = {
	indikatorId: number;
	uraianList: TransUraian[];
	first?: boolean;
};
const TransKpiUraianComponent = (props: TransKpiUraianComponentProps) => {
	const { indikatorId, uraianList, first } = props;

	return first ? (
		<UraianCell uraian={uraianList[0]} indikatorId={indikatorId} />
	) : (
		<>
			{uraianList.map((uraian, index) =>
				index === 0 ? null : (
					<TableRow key={uraian.id}>
						<UraianCell uraian={uraian} indikatorId={indikatorId} />
					</TableRow>
				)
			)}
		</>
	);
};

export default TransKpiUraianComponent;
