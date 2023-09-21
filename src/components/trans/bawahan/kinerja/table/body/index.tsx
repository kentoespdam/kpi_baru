import TableBody from "@mui/material/TableBody";
import {
	TransKpiQKeyProps,
	TransKpiWithAudit,
} from "@myTypes/entity/trans.kpi";
import { useTransKinerjaStore } from "@store/filter/trans/kinerja";
import { useQueryClient } from "@tanstack/react-query";
import DetailKpiBawahanIndikator from "./indikator";

type DetailKpiBawahanTableBodyProps = {
	queryKeyKpi: (string | TransKpiQKeyProps)[];
};
const DetailKpiBawahanTableBody = (props: DetailKpiBawahanTableBodyProps) => {
	const { queryKeyKpi } = props;
	const { nipamStaff, bridgeKpiBawahan } = useTransKinerjaStore();
	const qc = useQueryClient();
	const data = qc.getQueryData<TransKpiWithAudit>(queryKeyKpi);

	if (!data) return null;
	let urut = 1;
	return (
		<TableBody>
			{data.indikatorList.map((row) => (
				<DetailKpiBawahanIndikator
					key={row.id}
					urut={urut++}
					nipamStaff={nipamStaff}
					indikator={row}
					idKpi={Number(bridgeKpiBawahan?.kpi.id)}
				/>
			))}
		</TableBody>
	);
};

export default DetailKpiBawahanTableBody;
