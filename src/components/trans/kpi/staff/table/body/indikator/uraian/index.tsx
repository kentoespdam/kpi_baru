import CellBuilder from "@components/commons/table/cell.builder";
import TableRow from "@mui/material/TableRow";
import { TransUraian } from "@myTypes/entity/trans.uraian";
import TransKpiFileComponent from "./file";
import { AcceptedStatus } from "@myTypes/index";

type UraianCellProps = {
	indikatorId: number;
	uraian: TransUraian;
	lockedStatus: AcceptedStatus;
};
const UraianCell = (props: UraianCellProps) => {
	const { indikatorId, uraian, lockedStatus } = props;
	const { fileList } = uraian;

	return (
		<>
			<CellBuilder bordered value={uraian.uraian} />
			<TransKpiFileComponent
				fileList={fileList}
				uraianId={uraian.id}
				indikatorId={indikatorId}
				lockedStatus={lockedStatus}
			/>
		</>
	);
};

type TransKpiUraianComponentProps = {
	indikatorId: number;
	uraianList: TransUraian[];
	lockedStatus: AcceptedStatus;
	first?: boolean;
};
const TransKpiUraianComponent = (props: TransKpiUraianComponentProps) => {
	const { indikatorId, uraianList, lockedStatus, first } = props;

	return first ? (
		<UraianCell
			uraian={uraianList[0]}
			indikatorId={indikatorId}
			lockedStatus={lockedStatus}
		/>
	) : (
		<>
			{uraianList.map((uraian, index) =>
				index === 0 ? null : (
					<TableRow hover key={uraian.id}>
						<UraianCell
							uraian={uraian}
							indikatorId={indikatorId}
							lockedStatus={lockedStatus}
						/>
					</TableRow>
				)
			)}
		</>
	);
};

export default TransKpiUraianComponent;
