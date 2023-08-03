import AccordionDetails from "@mui/material/AccordionDetails";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { Employee } from "@myTypes/entity/employee";
import DetailKpiBawahanTableBody from "./table/body";
import DetailKpiBawahanTableHead from "./table/head";
import { useQueryClient } from "@tanstack/react-query";
import { useTransKpiBawahanStore } from "@store/filter/trans/bawahan";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { shallow } from "zustand/shallow";
import TableLoading from "@components/commons/table/loading";

type KpiBawahanAccordionDetailProps = {
	currStaff: Employee;
};
const KpiBawahanAccordionDetail = (props: KpiBawahanAccordionDetailProps) => {
	const periode = useTransKpiStore((state) => state.periode, shallow);
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
				<Table width="100%">
					<DetailKpiBawahanTableHead />
					{qStatus?.status === "loading" ||
					qStatus?.fetchStatus === "fetching" ? (
						<TableLoading colSpan={10} />
					) : (
						<DetailKpiBawahanTableBody />
					)}
				</Table>
			</TableContainer>
		</AccordionDetails>
	);
};

export default KpiBawahanAccordionDetail;
