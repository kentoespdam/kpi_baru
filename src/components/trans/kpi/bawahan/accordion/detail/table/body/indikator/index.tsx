import CellBuilder from "@components/commons/table/cell.builder";
import TableRow from "@mui/material/TableRow";
import { TransIndikator } from "@myTypes/entity/trans.indikator";
import DetailKpiBawahanUraian from "./uraian";

type DetailKpiBawahanIndikatorProps = {
	indikator: TransIndikator;
	urut: number;
};
const DetailKpiBawahanIndikator = (props: DetailKpiBawahanIndikatorProps) => {
	const { indikator, urut } = props;
	const uraianList = indikator.uraianList;
	const uraianSize = uraianList.length;
	const rowSpan = uraianSize <= 1 ? 1 : uraianSize;

	return (
		<>
			<TableRow>
				<CellBuilder value={urut} rowSpan={rowSpan} bordered />
				<CellBuilder
					value={indikator.indikator}
					rowSpan={rowSpan}
					bordered
				/>
				{uraianSize > 0 ? (
					<DetailKpiBawahanUraian uraianList={uraianList} first />
				) : (
					<>
						<CellBuilder bordered value="" />
						<CellBuilder bordered value="" />
						<CellBuilder bordered value="" />
					</>
				)}
			</TableRow>
			{rowSpan > 1 ? (
				<DetailKpiBawahanUraian uraianList={uraianList} first />
			) : null}
		</>
	);
};

export default DetailKpiBawahanIndikator;
