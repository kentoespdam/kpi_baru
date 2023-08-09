"use client";

import CellBuilder from "@components/commons/table/cell.builder";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { ProfesiWithPagination } from "@myTypes/entity/profesi";
import { useProfesiStore } from "@store/filter/master/profesi";
import { useQueryClient } from "@tanstack/react-query";
import ProfesiActionBtn from "./action";

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
