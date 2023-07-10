"use client";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import LevelTableHead from "./table/head";
import { useLevelStore } from "src/store/filter/master/level";
import { shallow } from "zustand/shallow";

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

	

	return (
		<TableContainer>
			<Table>
				<LevelTableHead />
			</Table>
		</TableContainer>
	);
};

export default LevelComponent;
