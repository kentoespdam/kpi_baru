import { ProfesiWithPagination } from "@myTypes/entity/profesi";
import { useProfesiStore } from "@store/filter/master/profesi";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const CellBuilder = dynamic(
	() => import("@components/commons/table/cell.builder")
);
const TableBody = dynamic(() => import("@mui/material/TableBody"));
const TableRow = dynamic(() => import("@mui/material/TableRow"));
const ProfesiActionBtn = dynamic(() => import("./action"));

const ProfesiTableBody = () => {
	const { pageRequest, sortRequest, status, name, level } = useProfesiStore();
	const qc = useQueryClient();
	const data = qc.getQueryData([
		"master.profesi",
		{ pageRequest, sortRequest },
		{ status, name, level },
	]) as ProfesiWithPagination | undefined;
	if (!data) return null;
	let urut = data.number * data.size + 1;

	return (
		<TableBody>
			{data.content.map((profesi) => (
				<TableRow hover key={profesi.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={profesi.name} />
					<CellBuilder value={profesi.level.level} />
					<CellBuilder value={profesi.status} chip />
					<ProfesiActionBtn row={profesi} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default ProfesiTableBody;
