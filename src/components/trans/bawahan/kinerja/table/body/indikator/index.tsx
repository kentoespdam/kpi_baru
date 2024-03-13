import CellBuilder from "@components/commons/table/cell.builder";
import TableRow from "@mui/material/TableRow";
import { TransIndikator } from "@myTypes/entity/trans.indikator";
import DetailKpiBawahanUraian from "./uraian";
import { AcceptedStatus } from "@myTypes/index";

type DetailKpiBawahanIndikatorProps = {
	nipamStaff: string | null;
	indikator: TransIndikator;
	urut: number;
	idKpi: number;
	lockedStatus: AcceptedStatus;
};
const DetailKpiBawahanIndikator = (props: DetailKpiBawahanIndikatorProps) => {
	const { nipamStaff, indikator, urut, idKpi, lockedStatus } = props;
	const uraianList = indikator.uraianList;
	const uraianSize = uraianList.length;
	const rowSpan = uraianSize <= 1 ? 1 : uraianSize;

	return (
		<>
			<TableRow hover>
				<CellBuilder value={urut} rowSpan={rowSpan} bordered />
				<CellBuilder
					value={indikator.indikator}
					rowSpan={rowSpan}
					bordered
					noWrap
				/>
				{uraianSize > 0 ? (
					<DetailKpiBawahanUraian
						nipamStaff={nipamStaff}
						idKpi={idKpi}
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
				<DetailKpiBawahanUraian
					nipamStaff={nipamStaff}
					idKpi={idKpi}
					uraianList={uraianList}
					lockedStatus={lockedStatus}
				/>
			) : null}
		</>
	);
};

export default DetailKpiBawahanIndikator;
