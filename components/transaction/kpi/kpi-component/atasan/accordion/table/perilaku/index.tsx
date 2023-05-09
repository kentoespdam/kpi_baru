import StripedTableStyle from "@commons/theme/striped.table.style";
import { getHelper } from "@helpers/useAsync";
import { LOCAL_TRANS_PERILAKU } from "@interfaces/ITransPerilaku";
import AccordionDetails from "@mui/material/AccordionDetails";
import TableContainer from "@mui/material/TableContainer";
import { useTransactionKpiStore } from "@storage/transaction/kpi.store";
import { useQuery } from "@tanstack/react-query";
import { shallow } from "zustand/shallow";
import PerilakuStaffTableBody from "./body";
import PerilakuStaffTableFooter from "./footer";
import PerilakuStaffTableHead from "./head";

type AccordionPerilakuProps = {
	nipam: string;
	level: number;
};
const AccordionPerilaku = (props: AccordionPerilakuProps) => {
	const { nipam, level } = props;
	const periode = useTransactionKpiStore((state) => state.periode, shallow);

	const { isInitialLoading, isLoading, isError, data, error } = useQuery({
		queryKey: ["perilaku", nipam, periode, level],
		queryFn: async () => {
			const search = new URLSearchParams();
			search.append("nipam", nipam);
			search.append("periode", `${periode}`);
			search.append("level", `${level}`);
			const response = await getHelper(
				`${LOCAL_TRANS_PERILAKU}?${search}`
			);
			return response.data;
		},
		enabled:
			nipam !== undefined && periode !== undefined && level !== undefined,
	});

	if (isLoading) return null;
	if (isInitialLoading) return <>Loading....</>;
	if (isError) return <>{JSON.stringify(error)}</>;
	if (data === undefined) return <>Data is Not Found!</>;

	return (
		<AccordionDetails>
			<TableContainer>
				<StripedTableStyle>
					<PerilakuStaffTableHead />
					<PerilakuStaffTableBody transPerilaku={data} />
					<PerilakuStaffTableFooter total={data.totalNilai} />
				</StripedTableStyle>
			</TableContainer>
		</AccordionDetails>
	);
};

export default AccordionPerilaku;
