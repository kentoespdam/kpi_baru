import { ITransKpiPegawai } from "@interfaces/ITransKpiPegawai";
import TableBody from "@mui/material/TableBody";
import KpiStaffIndikator from "./row.indikator";

type KpiStaffTableBodyProps = {
	transKpiPegawai: ITransKpiPegawai;
};
const KpiStaffTableBody = (props: KpiStaffTableBodyProps) => {
	const { transKpiPegawai } = props;
	if (transKpiPegawai === undefined) return null;
	const { indikatorList } = transKpiPegawai;

	return (
		<TableBody>
			{indikatorList.map((indikator, index) => (
				<KpiStaffIndikator
					key={index}
					urut={++index}
					indikator={indikator}
				/>
			))}
		</TableBody>
	);
};

export default KpiStaffTableBody;