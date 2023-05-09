import TableLoading from "@commons/components/table/table.loading";
import StripedTableStyle from "@commons/theme/striped.table.style";
import { getHelper } from "@helpers/useAsync";
import { LOCAL_BRIDGE_KPI_PEGAWAI } from "@interfaces/IBridgeKpiPegawai";
import {
	ITransKpiPegawai,
	LOCAL_TRANS_KPI_PEGAWAI,
} from "@interfaces/ITransKpiPegawai";
import TableContainer from "@mui/material/TableContainer";
import { useTransactionKpiStore } from "@storage/transaction/kpi.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import KpiStaffTableBody from "./table/body";
import KpiStaffTableHead from "./table/head";

async function getCurrentKpi(
	periode: string,
	nipam: string,
	setTransKpiPegawai: (transKpiPegawai: ITransKpiPegawai) => void
) {
	const bridgeKpi = await getHelper(
		`${LOCAL_BRIDGE_KPI_PEGAWAI}/nipam/${nipam}`
	);
	const search = new URLSearchParams();
	search.append("nipam", `${nipam}`);
	search.append("periode", `${periode}`);
	search.append("kpiId", `${bridgeKpi.data.kpi.id}`);
	const kpiPegawai = await getHelper(`${LOCAL_TRANS_KPI_PEGAWAI}?${search}`);
	setTransKpiPegawai(kpiPegawai.data);
	return kpiPegawai.data;
}

const KpiStaffComponent = () => {
	const { employee, periode, setTransKpiPegawai } = useTransactionKpiStore(
		(state) => ({
			employee: state.employee,
			periode: state.periode,
			setTransKpiPegawai: state.setTransKpiPegawai,
		}),
		shallow
	);

	const { isInitialLoading, isError, isLoading, data, error } = useQuery({
		queryKey: ["staff-detail", employee?.nipam, periode],
		queryFn: async () =>
			getCurrentKpi(periode!, employee!.nipam, setTransKpiPegawai),
		enabled: employee?.nipam !== undefined && periode !== undefined,
	});

	if (isLoading)
		return (
			<TableContainer>
				<StripedTableStyle>
					<KpiStaffTableHead />
					<TableLoading colSpan={5} message=".::please select period::." />
				</StripedTableStyle>
			</TableContainer>
		);
	if (isInitialLoading) return <div>Loading...</div>;
	if (isError) return <div>{JSON.stringify(error)}</div>;
	if (data === undefined) return null;

	return (
		<TableContainer>
			<StripedTableStyle>
				<KpiStaffTableHead />
				<KpiStaffTableBody transKpiPegawai={data} />
			</StripedTableStyle>
		</TableContainer>
	);
};

export default KpiStaffComponent;
