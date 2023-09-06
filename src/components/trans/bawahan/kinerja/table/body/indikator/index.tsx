import { TransIndikator } from "@myTypes/entity/trans.indikator";
import dynamic from "next/dynamic";

const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const TableRow = dynamic(() => import("@mui/material/TableRow"));
const DetailKpiBawahanUraian = dynamic(() => import("./uraian"));

type DetailKpiBawahanIndikatorProps = {
	nipamStaff: string | null;
	indikator: TransIndikator;
	urut: number;
	idKpi: number;
};
const DetailKpiBawahanIndikator = (props: DetailKpiBawahanIndikatorProps) => {
	const { nipamStaff, indikator, urut, idKpi } = props;
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
				/>
			) : null}
		</>
	);
};

export default DetailKpiBawahanIndikator;
