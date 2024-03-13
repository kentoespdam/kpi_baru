"use client";
import TableLoading from "@components/commons/table/loading";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { bridgePerilakuHead } from "@myTypes/entity/bridge.perilaku";
import { useBridgePerilakuStore } from "@store/filter/bridge/perilaku";
import { useQueries } from "@tanstack/react-query";
import { getPage } from "@utils/bridge/perilaku";
import dynamic from "next/dynamic";
import BridgePerilakuPagination from "./table/pagination";
import BridgePerilakuTableHead from "./table/head";

const BridgePerilakuTableBody = dynamic(() => import("./table/body"));

const BridgePerilakuComponent = () => {
	const { pageRequest, sortRequest, perilaku, level, status } =
		useBridgePerilakuStore();
	const queries = useQueries({
		queries: [
			{
				queryKey: [
					"bridge.perilaku",
					{ pageRequest, sortRequest },
					{ perilaku, level, status },
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
				<BridgePerilakuTableHead />
				{queries[0].isLoading ? (
					<TableLoading colSpan={bridgePerilakuHead.length} />
				) : queries[0].isError ? (
					<TableLoading colSpan={bridgePerilakuHead.length} error />
				) : (
					<BridgePerilakuTableBody />
				)}
			</Table>
			<BridgePerilakuPagination />
		</TableContainer>
	);
};

export default BridgePerilakuComponent;
