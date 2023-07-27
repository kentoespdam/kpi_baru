import CellBuilder from "@components/commons/table/cell.builder";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { TransKpi } from "@myTypes/entity/trans.kpi";
import { useTransKpiStore } from "@store/filter/trans/kpi";
import { useSessionStore } from "@store/main/session";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { shallow } from "zustand/shallow";
import TransKpiFileListItemCell from "./file.cell";
import TableCell from "@mui/material/TableCell";

type TransKpiFileListTableBodyProps = {
	indikatorId: number;
	uraianId: number;
};
const TransKpiFileListTableBody = (props: TransKpiFileListTableBodyProps) => {
	const { indikatorId, uraianId } = props;
	const curNipam = useSessionStore.getState().user?.userId;
	const { periode, bridgeKpi } = useTransKpiStore(
		(state) => ({
			periode: state.periode,
			bridgeKpi: state.bridgeKpi,
		}),
		shallow
	);
	const routes = useRouter();
	const qc = useQueryClient();
	const data = qc.getQueryData<TransKpi>([
		"trans.kpi.staff",
		{
			nipam: curNipam,
			kpiId: bridgeKpi?.id,
			periode: periode?.periode,
		},
	]);

	if (!data) {
		routes.push("/trans/kpi");
		return;
	}

	const indikator = data.indikatorList.find(
		(item) => item.id === Number(indikatorId)
	);

	const uraian = indikator?.uraianList.find(
		(item) => item.id === Number(uraianId)
	);

	const fileList = uraian?.fileList;

	let urut = 1;
	return (
		<TableBody>
			{fileList?.map((item) => (
				<TableRow>
					<CellBuilder value={urut++} />
					<TableCell>
						<TransKpiFileListItemCell uraianFile={item} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default TransKpiFileListTableBody;
