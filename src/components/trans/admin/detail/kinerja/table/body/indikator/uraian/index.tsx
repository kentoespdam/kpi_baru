import { TransUraian } from "@myTypes/entity/trans.uraian";
import { AcceptedStatus } from "@myTypes/index";
import KpiAdminKinerjaTableBodyUraianCell from "./cell";
import TableRow from "@mui/material/TableRow";

type KpiAdminKinerjaTableBodyUraianProps = {
	nipam: string | null;
	idKpi: number;
	uraianList: TransUraian[];
	lockedStatus: AcceptedStatus;
	first?: boolean;
};
const KpiAdminKinerjaTableBodyUraian = (
	props: KpiAdminKinerjaTableBodyUraianProps
) => {
	const { nipam, idKpi, uraianList, lockedStatus, first } = props;

	return first ? (
		<KpiAdminKinerjaTableBodyUraianCell
			nipam={nipam}
			idKpi={idKpi}
			uraian={uraianList[0]}
			lockedStatus={lockedStatus}
		/>
	) : (
		<>
			{uraianList.map((uraian, index) =>
				index === 0 ? null : (
					<TableRow hover key={index}>
						<KpiAdminKinerjaTableBodyUraianCell
							nipam={nipam}
							idKpi={idKpi}
							uraian={uraian}
							lockedStatus={lockedStatus}
						/>
					</TableRow>
				)
			)}
		</>
	);
};

export default KpiAdminKinerjaTableBodyUraian;
