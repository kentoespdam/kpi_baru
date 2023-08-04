"use client";

import CellBuilder from "@components/commons/table/cell.builder";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { LevelWithPagination } from "@myTypes/entity/level";
import { useLevelStore } from "@store/filter/master/level";
import { useQueryClient } from "@tanstack/react-query";
import LevelActionBtn from "./action";

const LevelTableBody = () => {
	const { pageRequest, sortRequest, status, level } = useLevelStore(
		(state) => ({
			pageRequest: state.pageRequest,
			sortRequest: state.sortRequest,
			status: state.status,
			level: state.level,
		})
	);
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
				<TableRow key={level.id}>
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
