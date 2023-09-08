"use client";
import TableLoading from "@components/commons/table/loading";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useSatuanStore } from "@store/filter/master/satuan";
import { useQueries } from "@tanstack/react-query";
import { getPage } from "@utils/master/satuan";
import dynamic from "next/dynamic";
import SatuanTableHead from "./table/head";
import SatuanPagination from "./table/pagination";

const SatuanTableBody = dynamic(() => import("./table/body"));

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
