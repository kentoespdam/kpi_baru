"use client";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useGradeStore } from "@store/filter/master/grade";
import { useQueries } from "@tanstack/react-query";
import { getPage } from "src/utils/master/grade";
import GradeTableHead from "./table/head";
import GradeTableBody from "./table/body";
import TableLoading from "@components/commons/table/loading";
import GradePagination from "./table/pagination";
import { gradeHeader } from "@myTypes/entity/grade";
import LinearProgress from "@mui/material/LinearProgress";

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
