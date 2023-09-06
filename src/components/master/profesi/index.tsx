"use client";
import { profesiHeader } from "@myTypes/entity/profesi";
import { useProfesiStore } from "@store/filter/master/profesi";
import { useQueries } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getPage } from "src/utils/master/profesi";

const TableLoading = dynamic(() => import("@components/commons/table/loading"));
const Table = dynamic(() => import("@mui/material/Table"));
const TableContainer = dynamic(() => import("@mui/material/TableContainer"));
const ProfesiTableBody = dynamic(() => import("./table/body"));
const ProfesiTableHead = dynamic(() => import("./table/head"));
const ProfesiPagination = dynamic(() => import("./table/pagination"));
const LinearProgress = dynamic(() => import("@mui/material/LinearProgress"));

const ProfesiComponent = () => {
	const { loading, pageRequest, sortRequest, status, name, level } =
		useProfesiStore();
	const queries = useQueries({
		queries: [
			{
				queryKey: [
					"master.profesi",
					{ pageRequest, sortRequest },
					{ status, name, level },
				],
				queryFn: getPage,
			},
		],
	});
	return (
		<TableContainer>
			{loading ? <LinearProgress /> : null}
			<Table>
				<ProfesiTableHead />
				{queries[0].isLoading ? (
					<TableLoading colSpan={profesiHeader.length} />
				) : queries[0].isError ? (
					<TableLoading colSpan={profesiHeader.length} error />
				) : (
					<ProfesiTableBody />
				)}
			</Table>
			<ProfesiPagination />
		</TableContainer>
	);
};

export default ProfesiComponent;
