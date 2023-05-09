import TableLoading from "@commons/components/table/table.loading";
import StripedTableStyle from "@commons/theme/striped.table.style";
import { getHelper } from "@helpers/useAsync";
import { LOCAL_TRANS_KPI_PEGAWAI } from "@interfaces/ITransKpiPegawai";
import AccordionDetails from "@mui/material/AccordionDetails";
import TableContainer from "@mui/material/TableContainer";
import { useTransactionKpiStore } from "@storage/transaction/kpi.store";
import { useQuery } from "@tanstack/react-query";
import { shallow } from "zustand/shallow";
import KpiStaffTableBody from "./body";
import KpiStaffTableFooter from "./footer";
import KpiStaffTableHead from "./head";

type AccordionStaffDetailProps = {
	nipam: string;
	kpiId?: number;
};
export const AccordionKinerja = (props: AccordionStaffDetailProps) => {
	const { nipam, kpiId } = props;
	const periode = useTransactionKpiStore((state) => state.periode, shallow);

	const { isInitialLoading, isLoading, isError, data, error } = useQuery({
		queryKey: ["kinerja", nipam, periode, kpiId],
		queryFn: async () => {
			const search = new URLSearchParams();
			search.append("nipam", nipam);
			search.append("periode", `${periode}`);
			search.append("kpiId", `${kpiId}`);
			const kpiPegawai = await getHelper(
				`${LOCAL_TRANS_KPI_PEGAWAI}?${search}`
			);
			return kpiPegawai.data;
		},
		enabled:
			nipam !== undefined && periode !== undefined && kpiId !== undefined,
	});

	if (periode === undefined || kpiId === undefined)
		return (
			<AccordionDetails>
				<TableContainer>
					<StripedTableStyle>
						<KpiStaffTableHead />
						<TableLoading
							colSpan={14}
							message=".::please select period::."
						/>
					</StripedTableStyle>
				</TableContainer>
			</AccordionDetails>
		);
	if (isLoading)
		return (
			<AccordionDetails>
				<TableContainer>
					<StripedTableStyle>
						<KpiStaffTableHead />
					</StripedTableStyle>
				</TableContainer>
			</AccordionDetails>
		);
	if (isInitialLoading)
		return <AccordionDetails>Loading...</AccordionDetails>;
	if (isError) return <div>{JSON.stringify(error)}</div>;

	return (
		<AccordionDetails>
			<TableContainer>
				<StripedTableStyle>
					<KpiStaffTableHead />
					<KpiStaffTableBody transKpiPegawai={data} />
					<KpiStaffTableFooter transKpiPegawai={data} />
				</StripedTableStyle>
			</TableContainer>
		</AccordionDetails>
	);
};
