import { TransUraian } from "@myTypes/entity/trans.uraian";
import dynamic from "next/dynamic";

const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const TableRow = dynamic(() => import("@mui/material/TableRow"));
const TransKpiFileComponent = dynamic(() => import("./file"));

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
					<TableRow hover key={uraian.id}>
						<UraianCell uraian={uraian} indikatorId={indikatorId} />
					</TableRow>
				)
			)}
		</>
	);
};

export default TransKpiUraianComponent;
