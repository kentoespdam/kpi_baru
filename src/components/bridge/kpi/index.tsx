"use client";

import TableLoading from "@components/commons/table/loading";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { bridgeKpiHead } from "@myTypes/entity/bridge.kpi";
import { useBridgeKpiStore } from "@store/filter/bridge/kpi";
import { useQueries } from "@tanstack/react-query";
import { getPage } from "@utils/bridge/kpi";
import dynamic from "next/dynamic";
import BridgeKpiPagination from "./pagination";
import BridgeKpiTableHead from "./table/head";

const BridgeKpiTableBody = dynamic(() => import("./table/body"));

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
			{queries[0].isFetching ? (
				<LinearProgress sx={{ width: "100%" }} />
			) : null}
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
