"use client";
import { useQueries } from "@tanstack/react-query";
import { getFiles } from "@utils/trans/file";
import dynamic from "next/dynamic";

const LinearProgress = dynamic(() => import("@mui/material/LinearProgress"));
const Table = dynamic(() => import("@mui/material/Table"));
const TableContainer = dynamic(() => import("@mui/material/TableContainer"));
const TransKpiFileListTableBody = dynamic(() => import("./table/body"));
const TransKpiFileListTableHead = dynamic(() => import("./table/head"));

type TransKpiFileListComponentProps = {
	uraianId: number;
};
const TransKpiFileListComponent = (props: TransKpiFileListComponentProps) => {
	const { uraianId } = props;

	const queries = useQueries({
		queries: [
			{
				queryKey: ["trans.file.list", Number(uraianId)],
				queryFn: getFiles,
				enabled: !!uraianId,
			},
		],
	});

	return (
		<TableContainer>
			{queries[0].isFetching || queries[0].isLoading ? (
				<LinearProgress />
			) : null}
			<Table>
				<TransKpiFileListTableHead />
				<TransKpiFileListTableBody uraianId={uraianId} />
			</Table>
		</TableContainer>
	);
};

export default TransKpiFileListComponent;
