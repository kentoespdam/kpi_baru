"use client";

import { useLevelStore } from "@store/filter/master/level";
import { useQueries } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getPage } from "src/utils/master/level";

const TableLoading = dynamic(() => import("@components/commons/table/loading"));
const Table = dynamic(() => import("@mui/material/Table"));
const TableContainer = dynamic(() => import("@mui/material/TableContainer"));
const LevelTableBody = dynamic(() => import("./table/body"));
const LevelTableHead = dynamic(() => import("./table/head"));
const LevelPagination = dynamic(() => import("./table/pagination"));
const LinearProgress = dynamic(() => import("@mui/material/LinearProgress"));

const LevelComponent = () => {
	const { pageRequest, sortRequest, status, level } = useLevelStore();
	const queries = useQueries({
		queries: [
			{
				queryKey: [
					"master.level",
					{ pageRequest, sortRequest, status, level },
				],
				queryFn: getPage,
			},
		],
	});

	return (
		<TableContainer>
			{queries[0].isLoading ? <LinearProgress /> : null}
			<Table>
				<LevelTableHead />
				{queries[0].isLoading ? (
					<TableLoading />
				) : queries[0].isError ? (
					<TableLoading error />
				) : (
					<LevelTableBody />
				)}
			</Table>
			<LevelPagination />
		</TableContainer>
	);
};

export default LevelComponent;
