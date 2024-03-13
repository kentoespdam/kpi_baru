"use client";
import TableLoading from "@components/commons/table/loading";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useLevelStore } from "@store/filter/master/level";
import { useQueries } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getPage } from "src/utils/master/level";
import LevelTableHead from "./table/head";
import LevelPagination from "./table/pagination";
const LevelTableBody = dynamic(() => import("./table/body"));

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
