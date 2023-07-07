"use client";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import LevelTableHead from "./table/head";
import { useLevelStore } from "src/store/filter/master/level";
import { shallow } from "zustand/shallow";

const LevelComponent = () => {
	const { sortRequest } = useLevelStore(
		(state) => ({ sortRequest: state.sortRequest }),
		shallow
	);

	console.log(sortRequest);
	
	return (
		<TableContainer>
			<Table>
				<LevelTableHead />
			</Table>
		</TableContainer>
	);
};

export default LevelComponent;
