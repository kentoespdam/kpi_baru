"use client";
import TableLoading from "@components/commons/table/loading";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { perilakuHeader } from "@myTypes/entity/perilaku";
import { usePerilakuStore } from "@store/filter/master/perilaku";
import { useQueries } from "@tanstack/react-query";
import { getPage } from "src/utils/master/perilaku";
import PerilakuTableBody from "./table/body";
import PerilakuTableHead from "./table/head";
import PerilakuPagination from "./table/pagination";

const PerilakuComponent = () => {
	const { pageRequest, sortRequest, status, kompetensi, uraian } =
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
