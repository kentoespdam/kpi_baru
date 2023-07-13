"use client";

import CellBuilder from "@components/commons/table/cell.builder";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { LevelWithAudit, LevelWithPagination } from "@myTypes/entity/level";
import { useQueryClient } from "@tanstack/react-query";
import { useLevelStore } from "src/store/filter/master/level";
import { shallow } from "zustand/shallow";

const LevelTableBody = () => {
	const { pageRequest, sortRequest, status, level } = useLevelStore(
		(state) => ({
			pageRequest: state.pageRequest,
			sortRequest: state.sortRequest,
			status: state.status,
			level: state.level,
		}),
		shallow
	);
	const qc = useQueryClient();
	const data = qc.getQueryData([
		"master.level",
		{ pageRequest, sortRequest, status, level },
	]) as LevelWithPagination | undefined;
	if (!data) return null;
	// const pages = data.data satisfies LevelWithPagination;
	let urut = data.number * data.size + 1;

	return (
		<TableBody>
			{data.content.map((level) => (
				<TableRow key={level.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={level.level} />
					<CellBuilder value={level.status} chip />
				</TableRow>
			))}
		</TableBody>
	);
};

export default LevelTableBody;
