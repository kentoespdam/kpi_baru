import CellBuilder from "@components/commons/table/cell.builder";
import TableRow from "@mui/material/TableRow";
import { IndikatorWithUraianList } from "@myTypes/entity/indikator";
import TransKpiUraianComponent from "./uraian";

type TransKpiIndikatorComponentProps = {
	indikator: IndikatorWithUraianList;
	urut: number;
};
const TransKpiIndikatorComponent = (props: TransKpiIndikatorComponentProps) => {
	const { indikator, urut } = props;
	const uraianList = indikator.uraianList;
	const uraianSize = uraianList.length;
	const rowSpan = uraianSize <= 1 ? 1 : uraianSize;

	return (
		<>
			<TableRow>
				<CellBuilder rowSpan={rowSpan} value={urut} />
				<CellBuilder rowSpan={rowSpan} value={indikator.indikator} />
				{uraianSize > 0 ? (
					<TransKpiUraianComponent uraianList={uraianList} first />
				) : null}
			</TableRow>
			{rowSpan > 1 ? (
				<TransKpiUraianComponent uraianList={uraianList} />
			) : null}
		</>
	);
};

export default TransKpiIndikatorComponent;
