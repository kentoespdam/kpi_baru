"use client";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import LevelTableHead from "./table/head";
import { useLevelStore } from "src/store/filter/master/level";
import { shallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "src/utils/master/level";
import TableLoading from "@components/commons/table/loading";
import LevelTableBody from "./table/body";

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

	const { isLoading, isError } = useQuery({
		queryKey: ["master.level", { pageRequest, sortRequest, status, level }],
		queryFn: async ({ queryKey }) => getPage(queryKey),
	});

	return (
		<TableContainer>
			<Table>
				<LevelTableHead />
				{isLoading ? (
					<TableLoading />
				) : isError ? (
					<TableLoading error />
				) : (
					<LevelTableBody />
				)}
			</Table>
		</TableContainer>
	);
};

export default LevelComponent;
