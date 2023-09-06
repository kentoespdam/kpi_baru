"use client";
import { perilakuHeader } from "@myTypes/entity/perilaku";
import { usePerilakuStore } from "@store/filter/master/perilaku";
import { useQueries } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { getPage } from "src/utils/master/perilaku";

const TableLoading = dynamic(() => import("@components/commons/table/loading"));
const Table = dynamic(() => import("@mui/material/Table"));
const TableContainer = dynamic(() => import("@mui/material/TableContainer"));
const PerilakuTableBody = dynamic(() => import("./table/body"));
const PerilakuTableHead = dynamic(() => import("./table/head"));
const PerilakuPagination = dynamic(() => import("./table/pagination"));
const LinearProgress = dynamic(() => import("@mui/material/LinearProgress"));

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
