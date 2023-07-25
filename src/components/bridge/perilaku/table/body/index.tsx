import CellBuilder from "@components/commons/table/cell.builder";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { BridgePerilakuWithPagination } from "@myTypes/entity/bridge.perilaku";
import { useBridgePerilakuStore } from "@store/filter/bridge/perilaku";
import { useQueryClient } from "@tanstack/react-query";
import BridgePerilakuActionButtons from "./action";

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
				<TableRow key={row.id}>
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
