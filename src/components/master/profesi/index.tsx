"use client";
import TableLoading from "@components/commons/table/loading";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { profesiHeader } from "@myTypes/entity/profesi";
import { useProfesiStore } from "@store/filter/master/profesi";
import { useQueries } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getPage } from "src/utils/master/profesi";
import ProfesiTableBody from "./table/body";
import ProfesiPagination from "./table/pagination";
const ProfesiTableHead = dynamic(() => import("./table/head"));

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
