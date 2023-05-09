import CellBuilder from "@commons/components/table/cell.builder";
import { IKpiUraian } from "@interfaces/ITransKpiPegawai";
import { KpiStaffFileCell } from "./cell.file";

type KpiStaffUraianCellProps = {
	uraian: IKpiUraian;
};
export const KpiStaffUraianCell = (props: KpiStaffUraianCellProps) => {
	const { uraian } = props;
	const { fileList } = uraian;

	return (
		<>
			<CellBuilder
				sx={{ maxWidth: 120, whiteSpace: "pre-wrap" }}
				value={uraian.uraian}
			/>
			<KpiStaffFileCell fileList={fileList} uraianId={uraian.id} />
		</>
	);
};
