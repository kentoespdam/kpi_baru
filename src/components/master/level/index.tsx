"use client";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import LevelTableHead from "./table/head";
import { useLevelStore } from "@store/filter/master/level";
import { shallow } from "zustand/shallow";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getPage } from "src/utils/master/level";
import TableLoading from "@components/commons/table/loading";
import LevelTableBody from "./table/body";
import LevelPagination from "./table/pagination";

const LevelComponent = () => {
	const { pageRequest, sortRequest, status, level } = useLevelStore(
		(state) => ({
			pageRequest: state.pageRequest,
			sortRequest: state.sortRequest,
			status: state.status,
			level: state.level,
		}),
		shallow
	);
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
