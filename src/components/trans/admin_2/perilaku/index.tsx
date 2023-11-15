import TableLoading from "@components/commons/table/loading";
import TransPerilakuTableHead from "@components/trans/bawahan/perilaku/table/head";
import { Periode } from "@helper/periode";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import {
	TransPerilaku,
	TransPerilakuQKeyProps,
} from "@myTypes/entity/trans.perilaku";
import { useQueryClient } from "@tanstack/react-query";
import KpiAdminPerilakuTableBody from "./table/body";
import TransPerilakuTableFooter from "@components/trans/bawahan/perilaku/table/footer";
import TransPerilakuTableBody from "@components/trans/bawahan/perilaku/table/body";

type KpiAdminPerilakuProps = {
	querKeyPerilaku: (string | TransPerilakuQKeyProps)[];
	nipam: string | null;
	periode: Periode | null;
	levelId: number | null;
};
const KpiAdminPerilaku = (props: KpiAdminPerilakuProps) => {
	const { querKeyPerilaku } = props;
	const qc = useQueryClient();
	const data = qc.getQueryData<TransPerilaku>(querKeyPerilaku);

	return (
		<TableContainer>
			<Table>
				<TransPerilakuTableHead />
				{!data ? (
					<TableLoading colSpan={6} error />
				) : (
					<TransPerilakuTableBody queryKey={querKeyPerilaku} />
				)}
				<TransPerilakuTableFooter queryKey={querKeyPerilaku} />
			</Table>
		</TableContainer>
	);
};

export default KpiAdminPerilaku;
