import CellBuilder from "@components/commons/table/cell.builder";
import TableRow from "@mui/material/TableRow";
import { TransIndikator } from "@myTypes/entity/trans.indikator";
import TransKpiUraianComponent from "./uraian";
import { AcceptedStatus } from "@myTypes/index";

type TransKpiIndikatorComponentProps = {
	indikator: TransIndikator;
	urut: number;
	lockedStatus: AcceptedStatus;
};
const TransKpiIndikatorComponent = (props: TransKpiIndikatorComponentProps) => {
	const { indikator, urut, lockedStatus } = props;
	const uraianList = indikator.uraianList;
	const uraianSize = uraianList.length;
	const rowSpan = uraianSize <= 1 ? 1 : uraianSize;

	return (
		<>
			<TableRow hover>
				<CellBuilder bordered rowSpan={rowSpan} value={urut} />
				<CellBuilder
					bordered
					rowSpan={rowSpan}
					value={indikator.indikator}
				/>
				{uraianSize > 0 ? (
					<TransKpiUraianComponent
						indikatorId={indikator.id}
						uraianList={uraianList}
						lockedStatus={lockedStatus}
						first
					/>
				) : (
					<>
						<CellBuilder bordered value="" />
						<CellBuilder bordered value="" />
						<CellBuilder bordered value="" />
					</>
				)}
			</TableRow>
			{rowSpan > 1 ? (
				<TransKpiUraianComponent
					indikatorId={indikator.id}
					uraianList={uraianList}
					lockedStatus={lockedStatus}
				/>
			) : null}
		</>
	);
};

export default TransKpiIndikatorComponent;
