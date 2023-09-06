"use client";
import { useSatuanStore } from "@store/filter/master/satuan";
import { useQueries } from "@tanstack/react-query";
import { getPage } from "@utils/master/satuan";
import dynamic from "next/dynamic";

const LinearProgress = dynamic(() => import("@mui/material/LinearProgress"));
const Table = dynamic(() => import("@mui/material/Table"));
const TableContainer = dynamic(() => import("@mui/material/TableContainer"));
const SatuanTableHead = dynamic(() => import("./table/head"));
const TableLoading = dynamic(() => import("@components/commons/table/loading"));
const SatuanTableBody = dynamic(() => import("./table/body"));
const SatuanPagination = dynamic(() => import("./table/pagination"));

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
