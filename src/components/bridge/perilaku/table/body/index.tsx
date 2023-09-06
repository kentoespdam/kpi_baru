import { BridgePerilakuWithPagination } from "@myTypes/entity/bridge.perilaku";
import { useBridgePerilakuStore } from "@store/filter/bridge/perilaku";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const BridgePerilakuActionButtons = dynamic(() => import("./action"));
const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const TableBody = dynamic(() => import("@mui/material/TableBody"));
const TableCell = dynamic(() => import("@mui/material/TableCell"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));
const Typography = dynamic(() => import("@mui/material/Typography"));

const BridgePerilakuTableBody = () => {
	const { pageRequest, sortRequest, perilaku, level, status } =
		useBridgePerilakuStore();
	const qc = useQueryClient();
	const data = qc.getQueryData([
		"bridge.perilaku",
		{ pageRequest, sortRequest },
		{ perilaku, level, status },
	]) as BridgePerilakuWithPagination | undefined;
	if (!data) return null;
	let urut = data.number * data.size + 1;
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow hover key={row.id}>
					<CellBuilder value={urut++} />
					<TableCell>
						<Typography variant="body1">
							{row.perilaku.kompetensi}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{row.perilaku.uraian}
						</Typography>
					</TableCell>
					<CellBuilder value={row.level!.level} />
					<CellBuilder value={row.status} chip />
					<BridgePerilakuActionButtons row={row} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default BridgePerilakuTableBody;
