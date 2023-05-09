import CellBuilder from "@commons/components/table/cell.builder";
import { IKpiIndikator } from "@interfaces/ITransKpiPegawai";
import TableRow from "@mui/material/TableRow";
import KpiStaffUraian from "./row.uraian";

type KpiIndikatorProps = {
	indikator: IKpiIndikator;
	urut: number;
};
const KpiStaffIndikator = (props: KpiIndikatorProps) => {
	const { indikator, urut } = props;
	const uraianList = indikator.uraianList;
	const uraianSize = indikator.uraianList?.length;
	const rowSpan = uraianSize <= 1 ? 1 : uraianSize;

	return (
		<>
			<TableRow>
				<CellBuilder rowSpan={rowSpan} value={urut} />
				<CellBuilder rowSpan={rowSpan} value={indikator.indikator} />
				{uraianSize > 0 ? (
					<KpiStaffUraian uraianList={uraianList} first />
				) : null}
			</TableRow>
			{rowSpan > 1 ? <KpiStaffUraian uraianList={uraianList} /> : null}
		</>
	);
};

export default KpiStaffIndikator;
