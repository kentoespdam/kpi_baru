import TableLoading from "@components/commons/table/loading";
import AccordionDetails from "@mui/material/AccordionDetails";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { Employee } from "@myTypes/entity/employee";
import { useTransKpiBawahanStore } from "@store/filter/trans/bawahan";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useQueryClient } from "@tanstack/react-query";
import DetailKpiBawahanTableBody from "./table/body";
import DetailKpiBawahanTableHead from "./table/head";
import DetailKpiBawahanTableFooter from "./table/footer";

type KpiBawahanAccordionDetailProps = {
	currStaff: Employee;
};
const KpiBawahanAccordionDetail = (props: KpiBawahanAccordionDetailProps) => {
	const periode = useTransKpiStore((state) => state.periode);
	const { nipamStaff, bridgeKpiBawahan } = useTransKpiBawahanStore();
	const qc = useQueryClient();
	const qStatus = qc.getQueryState([
		"trans.kpi.bawahan",
		{
			nipam: nipamStaff,
			kpiId: bridgeKpiBawahan?.kpi.id,
			periode: periode?.periode,
		},
	]);
	return (
		<AccordionDetails>
			<TableContainer>
				{qStatus?.status === "loading" ||
				qStatus?.fetchStatus === "fetching" ? (
					<LinearProgress />
				) : null}
				<Table width="100%">
					<DetailKpiBawahanTableHead />
					{qStatus?.status === "loading" ||
					qStatus?.fetchStatus === "fetching" ? (
						<TableLoading colSpan={10} />
					) : (
						<DetailKpiBawahanTableBody />
					)}
					<DetailKpiBawahanTableFooter />
				</Table>
			</TableContainer>
		</AccordionDetails>
	);
};

export default KpiBawahanAccordionDetail;
