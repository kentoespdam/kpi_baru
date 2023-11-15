import CellBuilder from "@components/commons/table/cell.builder";
import TableRow from "@mui/material/TableRow";
import { TransIndikator } from "@myTypes/entity/trans.indikator";
import { AcceptedStatus } from "@myTypes/index";
import KpiAdminKinerjaTableBodyUraian from "./uraian";

type KpiAdminKinerjaTableBodyIndikatorProps = {
	nipam: string | null;
	indikator: TransIndikator;
	urut: number;
	idKpi: number;
	lockedStatus: AcceptedStatus;
};
const KpiAdminKinerjaTableBodyIndikator = (
	props: KpiAdminKinerjaTableBodyIndikatorProps
) => {
	const { nipam, indikator, urut, idKpi, lockedStatus } = props;
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
					<KpiAdminKinerjaTableBodyUraian
						nipam={nipam}
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
		</>
	);
};

export default KpiAdminKinerjaTableBodyIndikator;
