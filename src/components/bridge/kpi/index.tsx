"use client";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useQueries } from "@tanstack/react-query";
import BridgeKpiTableHead from "./table/head";

const BridgeKpiComponent = () => {
	const queries = useQueries({
		queries: [
			{
				queryKey: ["bridge.kpi"],
			},
		],
	});

	return (
		<TableContainer>
			<Table>
				<BridgeKpiTableHead />
			</Table>
		</TableContainer>
	);
};

export default BridgeKpiComponent;
