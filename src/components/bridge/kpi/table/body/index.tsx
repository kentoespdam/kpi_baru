import CellBuilder from "@components/commons/table/cell.builder";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { BridgeKpiWithPagination } from "@myTypes/entity/bridge.kpi";
import { useBridgeKpiStore } from "@store/filter/bridge/kpi";
import { useQueryClient } from "@tanstack/react-query";
import BridgeKpiActionButtons from "./action";

const BridgeKpiTableBody = () => {
	const {
		pageRequest,
		sortRequest,
		nipam,
		name,
		position,
		organization,
		level,
		kpi,
		status,
	} = useBridgeKpiStore();
	const qc = useQueryClient();

	const data = qc.getQueryData([
		"bridge.kpi",
		{
			pageRequest,
			sortRequest,
		},
		{
			nipam,
			name,
			position,
			organization,
			level,
			kpi,
			status,
		},
	]) as BridgeKpiWithPagination | undefined;
	if (!data) return null;
	let urut = data.number * data.size + 1;

	return (
		<TableBody>
			{data.content.map((item) => (
				<TableRow hover key={item.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={item.level.level} />
					<CellBuilder value={item.nipam} />
					<CellBuilder value={String(item.name)} />
					<CellBuilder value={item.kpi.name} />
					<CellBuilder value={String(item.position?.name)} />
					<CellBuilder value={String(item.organization?.name)} />
					<CellBuilder
						value={item.roles ? item.roles.join(" | ") : ""}
					/>
					<CellBuilder value={item.status} chip />
					<BridgeKpiActionButtons row={item} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default BridgeKpiTableBody;
