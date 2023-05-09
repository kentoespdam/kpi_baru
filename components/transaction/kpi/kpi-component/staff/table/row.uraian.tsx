import { IKpiUraian } from "@interfaces/ITransKpiPegawai";
import TableRow from "@mui/material/TableRow";
import { KpiStaffUraianCell } from "./cell.uraian";

type KpiStaffUraianProps = {
	uraianList: IKpiUraian[];
	first?: boolean;
};
const KpiStaffUraian = (props: KpiStaffUraianProps) => {
	const { uraianList, first } = props;

	if (first) return <KpiStaffUraianCell uraian={uraianList[0]} />;
	return (
		<>
			{uraianList.map((uraian, index) =>
				index === 0 ? null : (
					<TableRow key={uraian.id}>
						<KpiStaffUraianCell uraian={uraian} />
					</TableRow>
				)
			)}
		</>
	);
};

export default KpiStaffUraian;
