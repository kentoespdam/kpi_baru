import { useTransactionKpiStore } from "@storage/transaction/kpi.store";
import DetailEmployeeComponent from "./detail.component";

const DetailAtasan = () => {
	const atasan = useTransactionKpiStore((state) => state.atasan);
	return (
		<DetailEmployeeComponent
			nipam={atasan!.nipam}
			nama={atasan!.nama}
			positionName={atasan!.position.name}
			organizationName={atasan!.organization.name}
			atasan
		/>
	);
};

export default DetailAtasan;
