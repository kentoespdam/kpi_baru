"use client";
import TableLoading from "@components/commons/table/loading";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { perilakuHeader } from "@myTypes/entity/perilaku";
import { usePerilakuStore } from "@store/filter/master/perilaku";
import { useQueries } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getPage } from "src/utils/master/perilaku";
import PerilakuTableHead from "./table/head";
import PerilakuPagination from "./table/pagination";
const PerilakuTableBody = dynamic(() => import("./table/body"));

const PerilakuComponent = () => {
	const { loading, pageRequest, sortRequest, status, kompetensi, uraian } =
		usePerilakuStore();
	const queries = useQueries({
		queries: [
			{
				queryKey: [
					"master.perilaku",
					{ pageRequest, sortRequest },
					{ status, kompetensi, uraian },
				],
				queryFn: getPage,
			},
		],
	});
	return (
		<TableContainer>
			{loading ? <LinearProgress /> : null}
			<Table>
				<PerilakuTableHead />
				{queries[0].isLoading ? (
					<TableLoading colSpan={perilakuHeader.length} />
				) : queries[0].isError ? (
					<TableLoading colSpan={perilakuHeader.length} error />
				) : (
					<PerilakuTableBody />
				)}
			</Table>
			<PerilakuPagination />
		</TableContainer>
	);
};

export default PerilakuComponent;
