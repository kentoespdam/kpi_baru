"use client";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useBridgePerilakuStore } from "@store/filter/bridge/perilaku";
import { useQueries } from "@tanstack/react-query";
import { getPage } from "@utils/bridge/perilaku";
import BridgePerilakuTableHead from "./table/head";
import { bridgePerilakuHead } from "@myTypes/entity/bridge.perilaku";
import TableLoading from "@components/commons/table/loading";
import BridgePerilakuTableBody from "./table/body";
import BridgePerilakuPagination from "./pagination";

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
