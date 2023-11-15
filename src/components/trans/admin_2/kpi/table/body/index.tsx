import DetailKpiBawahanIndikator from "@components/trans/bawahan/kinerja/table/body/indikator";
import TableBody from "@mui/material/TableBody";
import { TransKpi } from "@myTypes/entity/trans.kpi";

type KpiAdminTableBodyProps = {
	transKpi: TransKpi;
	nipam: string;
	idKpi: number;
};
const KpiAdminTableBody = (props: KpiAdminTableBodyProps) => {
	const { transKpi, nipam, idKpi } = props;
	let urut = 1;
	return (
		<TableBody>
			{transKpi.indikatorList.map((row) => (
				<DetailKpiBawahanIndikator
					key={row.id}
					urut={urut++}
					nipamStaff={nipam}
					indikator={row}
					idKpi={idKpi}
				/>
			))}
		</TableBody>
	);
};

export default KpiAdminTableBody;
