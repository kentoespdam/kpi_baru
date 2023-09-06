"use client";

import { gradeHeader } from "@myTypes/entity/grade";
import { useGradeStore } from "@store/filter/master/grade";
import { useQueries } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getPage } from "src/utils/master/grade";

const Table = dynamic(() => import("@mui/material/Table"));
const TableContainer = dynamic(() => import("@mui/material/TableContainer"));
const GradeTableHead = dynamic(() => import("./table/head"));
const GradeTableBody = dynamic(() => import("./table/body"));
const TableLoading = dynamic(() => import("@components/commons/table/loading"));
const GradePagination = dynamic(() => import("./table/pagination"));
const LinearProgress = dynamic(() => import("@mui/material/LinearProgress"));

const GradeComponent = () => {
	const { loading, pageRequest, sortRequest, status, grade, tukin, level } =
		useGradeStore();
	const queries = useQueries({
		queries: [
			{
				queryKey: [
					"master.grade",
					{ pageRequest, sortRequest },
					{ status, grade, tukin, level },
				],
				queryFn: getPage,
				retry: 2,
			},
		],
	});
	return (
		<TableContainer>
			{loading ? <LinearProgress /> : null}
			<Table>
				<GradeTableHead />
				{queries[0].isLoading ? (
					<TableLoading colSpan={gradeHeader.length} />
				) : queries[0].isError ? (
					<TableLoading colSpan={gradeHeader.length} error />
				) : (
					<GradeTableBody />
				)}
			</Table>
			<GradePagination />
		</TableContainer>
	);
};

export default GradeComponent;
