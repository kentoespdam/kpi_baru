import { LevelWithPagination } from "@myTypes/entity/level";
import { useLevelStore } from "@store/filter/master/level";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const TableBody = dynamic(() => import("@mui/material/TableBody"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));
const LevelActionBtn = dynamic(() => import("./action"));

const LevelTableBody = () => {
	const { pageRequest, sortRequest, status, level } = useLevelStore();

	const qc = useQueryClient();
	const data = qc.getQueryData([
		"master.level",
		{ pageRequest, sortRequest, status, level },
	]) as LevelWithPagination | undefined;
	if (!data) return null;
	let urut = data.number * data.size + 1;

	return (
		<TableBody>
			{data.content.map((level) => (
				<TableRow hover key={level.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={level.level} />
					<CellBuilder value={level.status} chip />
					<LevelActionBtn row={level} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default LevelTableBody;
