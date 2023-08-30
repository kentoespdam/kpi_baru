"use client";

import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useSatuanStore } from "@store/filter/master/satuan";
import { useQueries } from "@tanstack/react-query";
import { getPage } from "@utils/master/satuan";
import SatuanTableHead from "./table/head";
import TableLoading from "@components/commons/table/loading";
import SatuanTableBody from "./table/body";
import SatuanPagination from "./table/pagination";

const SatuanComponent = () => {
	const { pageRequest, sortRequest, status, satuan } = useSatuanStore();

	const queries = useQueries({
		queries: [
			{
				queryKey: [
					"master.satuan",
					{ pageRequest, sortRequest, status, satuan },
				],
				queryFn: getPage,
			},
		],
	});
	return (
		<TableContainer>
			{queries[0].isLoading ? <LinearProgress /> : null}
			<Table>
				<SatuanTableHead />
				{queries[0].isLoading ? (
					<TableLoading />
				) : queries[0].isError ? (
					<TableLoading error />
				) : (
					<SatuanTableBody />
				)}
			</Table>
			<SatuanPagination />
		</TableContainer>
	);
};

export default SatuanComponent;
