import { IKpiIndikator } from "@interfaces/ITransKpiPegawai";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KpiStaffUraian from "./row.uraian";

type KpiStaffIndikatorProps = {
	indikator: IKpiIndikator;
	urut: number;
};
const KpiStaffIndikator = (props: KpiStaffIndikatorProps) => {
	const { indikator, urut } = props;
	const uraianList = indikator.uraianList;
	const uraianSize = indikator.uraianList?.length;
	const rowSpan = uraianSize <= 1 ? 1 : uraianSize;

	return (
		<>
			<TableRow>
				<TableCell rowSpan={rowSpan}>{urut}</TableCell>
				<TableCell rowSpan={rowSpan}>{indikator.indikator}</TableCell>
				{uraianSize > 0 ? (
					<KpiStaffUraian uraianList={uraianList} first />
				) : null}
			</TableRow>
			{rowSpan > 1 ? <KpiStaffUraian uraianList={uraianList} /> : null}
		</>
	);
};

export default KpiStaffIndikator;
