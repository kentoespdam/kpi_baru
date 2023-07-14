"use client";

import CellBuilder from "@components/commons/table/cell.builder";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { GradeWithPagination } from "@myTypes/entity/grade";
import { useGradeStore } from "@store/filter/master/grade";
import { useQueryClient } from "@tanstack/react-query";
import GradeActionBtn from "./action";

const GradeTableBody = () => {
	const { pageRequest, sortRequest, status, grade, tukin, level } =
		useGradeStore();
	const qc = useQueryClient();
	const data = qc.getQueryData([
		"master.grade",
		{ pageRequest, sortRequest },
		{ status, grade, tukin, level },
	]) as GradeWithPagination | undefined;
	if (!data) return null;
	let urut = data.number * data.size + 1;

	return (
		<TableBody>
			{data.content.map((grade) => (
				<TableRow key={grade.id}>
					<CellBuilder value={urut++} />
					<CellBuilder value={`Grade ${grade.grade}`} />
					<CellBuilder value={grade.tukin} currency />
					<CellBuilder value={grade.level.level} />
					<CellBuilder value={grade.status} chip />
					<GradeActionBtn row={grade} />
				</TableRow>
			))}
		</TableBody>
	);
};

export default GradeTableBody;
