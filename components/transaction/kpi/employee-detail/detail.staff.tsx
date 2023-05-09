import { useTransactionKpiStore } from "@storage/transaction/kpi.store";
import { shallow } from "zustand/shallow";
import DetailEmployeeComponent from "./detail.component";

const DetailStaff = () => {
	const employee = useTransactionKpiStore((state) => state.employee, shallow);
	return (
		<DetailEmployeeComponent
			nipam={employee!.nipam}
			nama={employee!.nama}
			positionName={employee!.position.name}
			organizationName={employee!.organization.name}
		/>
	);
};
export default DetailStaff;
