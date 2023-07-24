"use client";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useBridgeKpiStore } from "@store/filter/bridge/kpi";
import { useQueries } from "@tanstack/react-query";
import { getPage } from "@utils/bridge/kpi";
import BridgeKpiTableHead from "./table/head";
import LinearProgress from "@mui/material/LinearProgress";
import TableLoading from "@components/commons/table/loading";
import { bridgeKpiHead } from "@myTypes/entity/bridge.kpi";
import BridgeKpiTableBody from "./table/body";
import BridgeKpiPagination from "./pagination";

const BridgeKpiComponent = () => {
	const {
		pageRequest,
		sortRequest,
		nipam,
		name,
		position,
		organization,
		level,
		kpi,
		status,
	} = useBridgeKpiStore();

	const queries = useQueries({
		queries: [
			{
				queryKey: [
					"bridge.kpi",
					{
						pageRequest,
						sortRequest,
					},
					{
						nipam,
						name,
						position,
						organization,
						level,
						kpi,
						status,
					},
				],
				queryFn: getPage,
				retry: 2,
			},
		],
	});

	return (
		<TableContainer>
			{queries[0].isFetching ? <LinearProgress /> : null}
			<Table>
				<BridgeKpiTableHead />
				{queries[0].isLoading ? (
					<TableLoading colSpan={bridgeKpiHead.length} />
				) : queries[0].isError ? (
					<TableLoading colSpan={bridgeKpiHead.length} error />
				) : (
					<BridgeKpiTableBody />
				)}
			</Table>
			<BridgeKpiPagination />
		</TableContainer>
	);
};

export default BridgeKpiComponent;
